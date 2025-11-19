import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
  try {
    const { cropName, soilType, soilPH, symptoms, location, imageData } = await request.json();

    // Validate inputs
    if (!cropName || !symptoms || !location) {
      return Response.json(
        { message: 'Missing required fields: cropName, symptoms, location' },
        { status: 400 }
      );
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Validate image if provided
    let imageValidation = null;
    if (imageData) {
      try {
        // First validate that the image matches the crop
        const [mimeTypePart, base64Data] = imageData.split(',');
        const mimeType = mimeTypePart.match(/:(.*?);/)?.[1] || 'image/jpeg';

        const validationPrompt = `You are an image analysis expert. Analyze this image and tell me:
1. What crop/plant is visible in the image? (tomato, wheat, rice, potato, etc.)
2. Does it match the claimed crop: "${cropName}"? (yes/no/uncertain)
3. If different, what crop do you see?
4. Rate confidence 0-100%

Respond in JSON only:
{
  "detected_crop": "crop name",
  "matches_claimed": true/false,
  "confidence": 85,
  "warning": "optional warning message"
}`;

        const validationContent = [
          { text: validationPrompt },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
        ];

        const validationResult = await model.generateContent(validationContent);
        const validationText = validationResult.response.text();
        
        try {
          const jsonMatch = validationText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            imageValidation = JSON.parse(jsonMatch[0]);
            console.log('Image validation:', imageValidation);
          }
        } catch (e) {
          console.log('Could not parse image validation');
        }
      } catch (validationError) {
        console.error('Image validation error:', validationError);
      }
    }

    // Create detailed prompt for soil analysis
    const analysisPrompt = `You are an agricultural expert. Analyze the following crop and soil information ${imageData ? 'and the uploaded image' : ''} and provide a detailed soil health assessment in JSON format.

Crop: ${cropName}
Soil Type: ${soilType || 'Not specified'}
Soil pH: ${soilPH || 'Not measured'}
Symptoms: ${symptoms}
Location: ${location}
${imageValidation && !imageValidation.matches_claimed ? `\n⚠️ IMAGE MISMATCH WARNING: Image appears to show "${imageValidation.detected_crop}" not "${cropName}"` : ''}

Provide a JSON response with this exact structure (no markdown, pure JSON):
{
  "soilHealth": <number 0-100>,
  "pH": <number 6-8>,
  "nitrogen": <number mg/kg>,
  "phosphorus": <number mg/kg>,
  "potassium": <number mg/kg>,
  "recommendations": [<array of 4-5 specific recommendations>],
  "crops": "${cropName}",
  "location": "${location}",
  "analysis": "<brief analysis of the condition>",
  "imageMatch": ${imageValidation ? imageValidation.matches_claimed : null},
  "detectedCrop": "${imageValidation?.detected_crop || 'Not analyzed'}"
}

Make the values realistic based on the symptoms, soil type${imageData ? ', and the uploaded soil/plant image' : ''}. Be specific and actionable in recommendations.`;

    // Build content for Gemini API
    let generationContent;
    if (imageData) {
      try {
        // Extract base64 data from data URL
        const [mimeTypePart, base64Data] = imageData.split(',');
        const mimeType = mimeTypePart.match(/:(.*?);/)?.[1] || 'image/jpeg';
        
        if (!base64Data) {
          throw new Error('Invalid image data format');
        }

        generationContent = [
          { text: analysisPrompt },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
        ];
      } catch (imageError) {
        console.error('Image processing error:', imageError);
        // Fall back to text-only analysis if image processing fails
        generationContent = [{ text: analysisPrompt }];
      }
    } else {
      generationContent = [{ text: analysisPrompt }];
    }

    // Call Gemini API
    const result = await model.generateContent(generationContent);
    const responseText = result.response.text();

    // Parse JSON response
    let analysisData;
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('No JSON found in Gemini response:', responseText.substring(0, 500));
        throw new Error('No JSON found in response');
      }
      analysisData = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError.message);
      console.error('Gemini Response:', responseText.substring(0, 1000));
      
      // Return fallback data instead of error
      return Response.json({
        soilHealth: 70,
        pH: 6.8,
        nitrogen: 150,
        phosphorus: 60,
        potassium: 200,
        recommendations: [
          'Apply balanced NPK fertilizer',
          'Maintain proper soil moisture',
          'Ensure adequate drainage',
          'Monitor soil pH levels regularly'
        ],
        crops: cropName,
        location: location,
        analysis: 'Analysis completed with default values due to processing'
      });
    }

    // Validate and ensure all required fields exist
    const validatedData = {
      soilHealth: Math.min(100, Math.max(0, parseInt(analysisData.soilHealth) || 75)),
      pH: parseFloat(analysisData.pH) || 6.8,
      nitrogen: parseInt(analysisData.nitrogen) || 150,
      phosphorus: parseInt(analysisData.phosphorus) || 60,
      potassium: parseInt(analysisData.potassium) || 200,
      recommendations: Array.isArray(analysisData.recommendations) 
        ? analysisData.recommendations.slice(0, 5)
        : ['Monitor soil regularly', 'Maintain proper irrigation', 'Apply balanced fertilizer', 'Check pH levels'],
      crops: cropName,
      location: location,
      analysis: analysisData.analysis || 'Soil analysis completed',
      imageValidation: imageValidation ? {
        detected_crop: imageValidation.detected_crop,
        matches: imageValidation.matches_claimed,
        confidence: imageValidation.confidence,
        warning: imageValidation.warning
      } : null
    };

    return Response.json(validatedData);
  } catch (error) {
    console.error('Soil Analysis API Error:', error);
    return Response.json(
      { message: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}
