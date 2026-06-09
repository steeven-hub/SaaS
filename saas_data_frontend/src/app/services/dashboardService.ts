import { API_BASE_URL } from '../config';

export const dashboardService = {
  getLicenses: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/dashboard/licenses`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw response;
    return response.json();
  },
  getInvoices: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/dashboard/invoices`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw response;
    return response.json();
  },
  getDownloads: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/dashboard/downloads`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw response;
    return response.json();
  }
};
