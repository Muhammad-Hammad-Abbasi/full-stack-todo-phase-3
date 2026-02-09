import { NextResponse } from 'next/server';

const ENV_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
const BACKEND_URL = ENV_URL.replace(/[\[\]"]/g, "").trim().replace(/\/$/, '');

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Call the actual Backend on Render
    const res = await fetch(`${BACKEND_URL}/api/v1/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.detail || 'Signup failed' }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Signup proxy error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}