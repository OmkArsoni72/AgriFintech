"use client";
import { useState } from "react";

export default function GeminiChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      setLocation("Location not supported");
      return;
    }
    setLocation("Detecting...");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          // Use WeatherAPI for better location data
          const weatherApiKey = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
          const res = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${latitude},${longitude}&aqi=no`
          );
          const data = await res.json();
          
          if (data && data.location) {
            const loc = data.location;
            // Create detailed location string with city, region, and country
            const locationName = [
              loc.name,
              loc.region,
              loc.country
            ].filter(Boolean).join(", ");
            
            setLocation(locationName || "Unknown Location");
          } else {
            // Fallback: Use coordinates
            setLocation(`${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E`);
          }
        } catch (error) {
          console.error("Location fetch error:", error);
          setLocation(`${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E`);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocation("Unable to detect location - Please enable location access");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userInput = input;
    setLoading(true);
    setMessages([...messages, { role: "user", content: userInput }]);
    setInput("");
    
    try {
      // Call our backend API instead of direct external API
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          location: location || 'India'
        }),
      });
      
      const data = await res.json();
      console.log("Chat API Response:", data);
      
      // Check if we should use fallback
      if (data.fallback || data.error) {
        console.log("Using fallback response:", data.error);
        const fallbackResponse = getFallbackResponse(userInput, location);
        setMessages((msgs) => [...msgs, { role: "bot", content: fallbackResponse }]);
      } else if (data.answer && data.answer.length > 20) {
        setMessages((msgs) => [...msgs, { role: "bot", content: data.answer }]);
      } else {
        // Fallback if answer too short
        const fallbackResponse = getFallbackResponse(userInput, location);
        setMessages((msgs) => [...msgs, { role: "bot", content: fallbackResponse }]);
      }
      
    } catch (err) {
      console.error("Chatbot error:", err);
      
      // Always provide helpful fallback
      const fallbackResponse = getFallbackResponse(userInput, location);
      setMessages((msgs) => [...msgs, { 
        role: "bot", 
        content: fallbackResponse
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Fallback response function for offline/error scenarios
  const getFallbackResponse = (query, userLocation) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('crop') || lowerQuery.includes('fasal')) {
      return `**Indian Crop Recommendations${userLocation ? ` for ${userLocation}` : ''}:**

**Kharif Season (Jun-Oct):** Rice, Cotton, Soybean, Maize, Groundnut
**Rabi Season (Oct-Mar):** Wheat, Mustard, Chickpea, Barley

**Tips:**
- Check soil health card
- Use govt schemes: PM-KISAN, PMFBY
- Contact local Krishi Vigyan Kendra

For detailed advice, visit: **mykrishimitra.gov.in**`;
    } else if (lowerQuery.includes('weather') || lowerQuery.includes('mausam')) {
      return `**Weather Advisory:**

Check accurate weather at:
- **IMD Website**: mausam.imd.gov.in
- **Meghdoot App** by Govt of India
- **AAS App** for farmers

💡 Always plan farming activities based on 5-7 day forecast.`;
    } else if (lowerQuery.includes('loan') || lowerQuery.includes('karz')) {
      return `**Agricultural Loans:**

**Kisan Credit Card (KCC):**
- Low interest (4-7%)
- Up to ₹3 lakh without collateral

**Visit:**
- Nearest bank branch
- PM-KISAN portal
- Call: 155261 (Kisan Call Center)

**Documents:** Aadhaar, Land records, Bank passbook`;
    } else {
      return `**AgriFinAI Assistant**

मैं भारतीय किसानों के लिए सहायक हूं। आप मुझसे पूछ सकते हैं:

**Topics:**
- Crop recommendations (फसल सिफारिशें)
- Weather info (मौसम जानकारी)
- Soil health (मिट्टी स्वास्थ्य)
- Loans & schemes (ऋण और योजनाएं)
- Market prices (बाजार मूल्य)

**Helpline:** 155261 (Kisan Call Center)
**Website:** farmer.gov.in`;
    }
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-700 text-white p-4 rounded-full shadow-xl z-50 hover:scale-105 transition-transform"
        onClick={() => setOpen(true)}
        title="Chat with Agri AI"
      >
        <span className="text-xl">💬</span>
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 bg-white rounded-2xl shadow-2xl w-96 h-[32rem] flex flex-col z-50 border border-green-600">
          <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-green-100 to-green-200 rounded-t-2xl">
            <span className="font-bold text-green-700 text-lg">AgriConnect AI Chatbot</span>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-red-500 text-xl">✖️</button>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border-b">
            <button
              className="bg-green-600 text-white px-3 py-1 rounded shadow hover:bg-green-700"
              onClick={detectLocation}
              type="button"
            >
              {location ? `📍 ${location}` : "Detect Location"}
            </button>
            <span className="text-xs text-gray-500">Location helps with crop/weather queries</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] px-4 py-2 rounded-lg shadow ${
                  msg.role === "user"
                    ? "ml-auto bg-green-200 text-green-900"
                    : "mr-auto bg-white border border-green-100 text-gray-800"
                }`}
              >
                {/* Render markdown for bot messages */}
                {msg.role === "bot" ? (
                  <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>") }} />
                ) : (
                  <span>{msg.content}</span>
                )}
              </div>
            ))}
            {loading && <div className="text-gray-400 text-xs">Typing...</div>}
          </div>
          <div className="p-4 border-t flex gap-2 bg-white">
            <input
              className="flex-1 border rounded-lg px-3 py-2 shadow focus:ring-2 focus:ring-green-500"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about crops, soil, weather, loans..."
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              className="bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform"
              onClick={sendMessage}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}