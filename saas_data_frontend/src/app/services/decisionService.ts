import { API_BASE_URL } from '../config';

export const decisionService = {
  getInsights: async (data: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/data/ai-insights`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ data }),
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch AI insights');
    }
    return response.json();
  }
};
