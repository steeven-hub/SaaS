import { API_BASE_URL } from '../config';

export const billingService = {
  createCheckoutSession: async (plan: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/billing/create-checkout-session?plan=${plan}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
    });
    
    if (!response.ok) {
        throw new Error('Checkout session creation failed');
    }
    return response.json();
  }
};
