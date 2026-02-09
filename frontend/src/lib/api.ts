const ENV_URL = process.env.NEXT_PUBLIC_API_URL || 'https://phase-2-todo-web.onrender.com';
export const API_URL = ENV_URL.replace(/[\[\]"]/g, "").trim().replace(/\/$/, '') + '/api/v1';

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Ensure endpoint starts with /
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  console.log(`[API] Calling: ${API_URL}${path}`);

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 204) return null;

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'API Error');
  }

  return data;
}