import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  private apiUrl = 'http://localhost:8000/api/data';

  constructor(private http: HttpClient) {}

  uploadDemoFile(file: File): Observable<Blob> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/upload-demo`, formData, {
      responseType: 'blob'
    });
  }
}
