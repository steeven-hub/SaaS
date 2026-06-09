import { API_BASE_URL } from '../config';

export const runMarketPipeline = async (file: File | null = null) => {
  const token = localStorage.getItem('access_token');
  const formData = new FormData();
  
  if (file) {
    formData.append('file', file);
  }
  
  const response = await fetch(`${API_BASE_URL}/data/pipeline`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: file ? formData : null
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to run market pipeline: ${response.status} ${errorText}`);
  }
  return response.json();
};
