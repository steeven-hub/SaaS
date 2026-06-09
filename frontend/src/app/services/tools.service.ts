import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  private dataApi = 'http://localhost:8000/api/data';
  private hackathonApi = 'http://localhost:8000/api/hackathon';

  constructor(private http: HttpClient) {}

  getAIInsights(dataSummary: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.dataApi}/ai-insights?data=${encodeURIComponent(dataSummary)}`, {}, { headers });
  }

  generatePDF(insights: string[]): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.dataApi}/generate-pdf`, insights, { headers, responseType: 'blob' });
  }

  runEDABaseline(file: File): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.hackathonApi}/eda-baseline`, formData, { headers });
  }

  validateSubmission(submission: File, sample: File): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const formData = new FormData();
    formData.append('submission', submission);
    formData.append('sample', sample);
    return this.http.post(`${this.hackathonApi}/validate-submission`, formData, { headers });
  }
}
