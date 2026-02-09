import { NextResponse } from 'next/server';

const ENV_URL = process.env.NEXT_PUBLIC_API_URL || 'https://127.0.0.1:8000';
const BACKEND_URL = ENV_URL.replace(/[\[\]"]/g, "").trim().replace(/\/$/, '');

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log(`[Proxy] Attempting login to: ${BACKEND_URL}/api/v1/auth/login`);

    // Call the actual Backend on Render
    const res = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    // Check content type to safely parse JSON
    const contentType = res.headers.get("content-type");
    let data;
    if (contentType && contentType.indexOf("application/json") !== -1) {
      data = await res.json();
    } else {
      const text = await res.text();
      console.error('[Proxy] Non-JSON response from backend:', text);
      return NextResponse.json({ error: `Backend returned non-JSON error: ${res.status}` }, { status: res.status });
    }

    if (!res.ok) {
      console.error('[Proxy] Backend error:', data);
      return NextResponse.json({ error: data.detail || 'Invalid credentials' }, { status: res.status });
    }

    const response = NextResponse.json(data);
    
    // Set cookie for Next.js middleware using the token from Render
    if (data.token) {
      response.cookies.set('token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
      });
    }

    return response;
  } catch (error) {
    console.error('[Proxy] Login proxy CRITICAL error:', error);
    return NextResponse.json({ error: 'Internal Server Error (Proxy)' }, { status: 500 });
  }
}
