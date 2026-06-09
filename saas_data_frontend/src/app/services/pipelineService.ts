import { API_BASE_URL } from '../config';

export const runMarketPipeline = async () => {
  const token = localStorage.getItem('access_token');
  console.log("Token utilisé pour le pipeline :", token);
  
  const response = await fetch(`${API_BASE_URL}/data/pipeline`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  console.log("Status de la réponse du backend :", response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erreur détaillée du serveur :", errorText);
    throw new Error(`Failed to run market pipeline: ${response.status} ${errorText}`);
  }
  return response.json();
};
