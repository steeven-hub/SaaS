import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-etl',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './etl.html',
  styleUrl: './etl.css'
})
export class EtlComponent {
  conn = {
    db_type: 'postgresql',
    host: 'localhost',
    port: 5432,
    user: '',
    password: '',
    dbname: 'postgres'
  };
  dbs: string[] = [];

  constructor(private http: HttpClient, private toastService: ToastService) {}

  discoverDatabases() {
    this.http.post('http://localhost:8000/api/db/list', this.conn).subscribe({
      next: (res: any) => {
        this.dbs = res.databases;
        this.toastService.success('Databases discovered!');
      },
      error: () => this.toastService.error('Connection failed.')
    });
  }
}
