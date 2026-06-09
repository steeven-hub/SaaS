import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface TokenResponse {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth';
  currentUser = signal<string | null>(localStorage.getItem('user_email'));

  constructor(private http: HttpClient) {}

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  login(email: string, password: string): Observable<TokenResponse> {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, formData).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user_email', email);
        this.currentUser.set(email);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
