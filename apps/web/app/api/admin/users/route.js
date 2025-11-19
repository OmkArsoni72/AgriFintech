const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function GET(request) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/users`);
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Admin users list error:', error);
    return Response.json(
      { 
        success: false, 
        message: 'Failed to fetch users',
        error: error.message 
      },
      { status: 500 }
    );
  }
}
