import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoService } from '../../services/demo';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  isProcessing = false;

  constructor(
    private demoService: DemoService,
    private toastService: ToastService
  ) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.processDemoFile(file);
    }
  }

  processDemoFile(file: File) {
    this.isProcessing = true;
    this.toastService.info('Processing your demo file...');

    this.demoService.uploadDemoFile(file).subscribe({
      next: (blob: Blob) => {
        this.isProcessing = false;
        this.toastService.success('File processed! Download starting...');
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `processed_${file.name.split('.')[0]}.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.isProcessing = false;
        this.toastService.error('Error processing demo file.');
        console.error(err);
      }
    });
  }
}
