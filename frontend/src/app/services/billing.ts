import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private apiUrl = 'http://localhost:8000/api/billing';

  constructor(private http: HttpClient) {}

  createCheckoutSession(plan: string): Observable<{ url: string }> {
    const token = localStorage.getItem('token');
    console.log("DEBUG: Token retrieved from localStorage:", token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("DEBUG: Headers being sent:", headers.get('Authorization'));
    
    return this.http.post<{ url: string }>(
      `${this.apiUrl}/create-checkout-session?plan=${plan}`, 
      {},
      { headers }
    );
  }
}
