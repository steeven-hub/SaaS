import { API_BASE_URL } from '../config';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ username: email, password: password }),
    });
    if (!response.ok) {
        const error = new Error('Login failed');
        (error as any).response = response;
        throw error;
    }
    const data = await response.json();
    
    // Accept both 'access_token' or 'access'
    const accessToken = data.access_token || data.access;
    const refreshToken = data.refresh_token || data.refresh;
    
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
    return data;
  },
  register: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        const error = new Error('Registration failed');
        (error as any).response = response;
        throw error;
    }
    return response.json();
  },
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },
  getProfile: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  }
};
