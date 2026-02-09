
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Login failed');
  }
  return res.json();
}

export async function signup(email: string, password: string, name: string): Promise<{ success: boolean; userId: string }> {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
  if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Signup failed');
  }
  return res.json();
}

export async function logout() {
    // Optionally call server to clear cookie
    document.cookie = 'token=; Max-Age=0; path=/;';
}
