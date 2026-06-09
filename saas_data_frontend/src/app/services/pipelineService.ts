import { API_BASE_URL } from '../config';

export const runMarketPipeline = async () => {
  const response = await fetch(`${API_BASE_URL}/data/pipeline`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to run market pipeline');
  }
  return response.json();
};
