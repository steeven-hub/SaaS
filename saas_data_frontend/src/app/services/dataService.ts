import { API_BASE_URL } from '../config';

export const dataService = {
  uploadFile: async (file: File, token?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    
    // We add ?format=json to signal the backend to return JSON (for Auto-EDA) 
    // instead of the raw Excel file if the user needs that.
    const url = token ? `${API_BASE_URL}/data/upload?format=json` : `${API_BASE_URL}/data/upload-demo`;
    const headers: HeadersInit = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: formData,
    });
    
    if (!response.ok) throw new Error('File upload failed');
    
    // If it's JSON (Auto-EDA mode), parse it
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }
    
    // Otherwise, handle it as a file download
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `processed_${file.name}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(blobUrl);
    return { message: 'File processed' };
  },

  getAIInsights: async (data: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/data/ai-insights`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ data }),
    });
    if (!response.ok) throw new Error('Failed to fetch AI insights');
    return response.json();
  },

  generatePDF: async (insights: string[], filename: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/data/generate-pdf`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ insights, filename }),
    });
    if (!response.ok) throw new Error('Failed to generate PDF');
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  },

  validateSubmission: async (file: File, tasks: any[], token: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tasks', JSON.stringify(tasks));

    const response = await fetch(`${API_BASE_URL}/hackathon/validate-submission`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error('Validation failed');
    return response.json();
  }
};
