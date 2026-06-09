import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {
  kpis: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:8000/api/admin/kpis').subscribe(data => {
      this.kpis = data;
    });
  }
}
