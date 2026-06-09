import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data';
import { ToastService } from '../../services/toast';
import * as XLSX from 'xlsx';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface ProcessedFile {
  name: string;
  date: Date;
  status: 'Completed' | 'Processing' | 'Failed';
  blob?: Blob;
  previewData?: any[];
  previewColumns?: string[];
  insights?: string[];
  profilingData?: any[];
  chartData?: { [key: string]: { labels: string[], counts: number[] } };
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  isDragging = false;
  processedFiles: ProcessedFile[] = [];
  errorMessage = '';
  
  showPreview = false;
  selectedFile: ProcessedFile | null = null;

  // Chart Properties
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart: Chart | null = null;
  selectedColumn = '';
  selectedChartType: 'bar' | 'pie' | 'line' = 'bar';

  constructor(
    private dataService: DataService,
    private toastService: ToastService
  ) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave() {
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  handleFile(file: File) {
    this.errorMessage = '';
    const newFile: ProcessedFile = {
      name: file.name,
      date: new Date(),
      status: 'Processing'
    };
    this.processedFiles.unshift(newFile);
    this.toastService.info(`Starting to process ${file.name}...`);

    this.dataService.uploadFile(file).subscribe({
      next: (response: Blob) => {
        newFile.status = 'Completed';
        newFile.blob = response;
        
        // Extract preview and insights from Excel
        this.generatePreview(newFile);
        
        this.toastService.success(`${file.name} processed and profiled successfully!`);
      },
      error: (err) => {
        newFile.status = 'Failed';
        this.errorMessage = 'Failed to process file.';
        this.toastService.error(`Error processing ${file.name}`);
        console.error('Processing error', err);
      }
    });
  }

  async generatePreview(file: ProcessedFile) {
    if (!file.blob) return;
    
    try {
      const data = await file.blob.arrayBuffer();
      const workbook = XLSX.read(data);
      
      // 1. Data Preview
      const worksheet = workbook.Sheets['Cleaned Data'];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      if (jsonData.length > 0) {
        file.previewColumns = jsonData[0];
        file.previewData = jsonData.slice(1, 6);
      }

      // 2. Insights
      const insightsSheet = workbook.Sheets['Decision Hub'];
      if (insightsSheet) {
        const insightsData: any[] = XLSX.utils.sheet_to_json(insightsSheet);
        file.insights = insightsData.map(row => row['Decision Metrics']);
      }

      // 3. Profiling Data
      const profilingSheet = workbook.Sheets['Profiling Report'];
      if (profilingSheet) {
        file.profilingData = XLSX.utils.sheet_to_json(profilingSheet);
      }

      // 4. Chart Data
      const chartSheet = workbook.Sheets['Chart Data'];
      if (chartSheet) {
        const rawChartData: any[] = XLSX.utils.sheet_to_json(chartSheet);
        const processedChartData: { [key: string]: { labels: string[], counts: number[] } } = {};
        
        rawChartData.forEach(row => {
          const col = row['Column'];
          if (!processedChartData[col]) {
            processedChartData[col] = { labels: [], counts: [] };
          }
          processedChartData[col].labels.push(row['Label']);
          processedChartData[col].counts.push(row['Count']);
        });
        
        file.chartData = processedChartData;
      }
    } catch (e) {
      console.error('Error generating preview', e);
    }
  }

  openPreview(file: ProcessedFile) {
    this.selectedFile = file;
    this.showPreview = true;
    
    // Default to first available column for chart
    if (file.chartData) {
      this.selectedColumn = Object.keys(file.chartData)[0];
      // Delay to ensure canvas is rendered
      setTimeout(() => this.updateChart(), 100);
    }
  }

  closePreview() {
    this.showPreview = false;
    this.selectedFile = null;
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  updateChart() {
    if (!this.selectedFile?.chartData || !this.selectedColumn || !this.chartCanvas) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const data = this.selectedFile.chartData[this.selectedColumn];

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: this.selectedChartType,
      data: {
        labels: data.labels,
        datasets: [{
          label: `Distribution of ${this.selectedColumn}`,
          data: data.counts,
          backgroundColor: [
            'rgba(99, 102, 241, 0.5)',
            'rgba(16, 185, 129, 0.5)',
            'rgba(245, 158, 11, 0.5)',
            'rgba(239, 68, 68, 0.5)',
            'rgba(139, 92, 246, 0.5)',
            'rgba(236, 72, 153, 0.5)',
            'rgba(20, 184, 166, 0.5)',
            'rgba(107, 114, 128, 0.5)',
            'rgba(251, 146, 60, 0.5)',
            'rgba(45, 212, 191, 0.5)'
          ],
          borderColor: [
            'rgb(99, 102, 241)',
            'rgb(16, 185, 129)',
            'rgb(245, 158, 11)',
            'rgb(239, 68, 68)',
            'rgb(139, 92, 246)',
            'rgb(236, 72, 153)',
            'rgb(20, 184, 166)',
            'rgb(107, 114, 128)',
            'rgb(251, 146, 60)',
            'rgb(45, 212, 191)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: this.selectedChartType === 'pie',
            position: 'right'
          }
        },
        scales: this.selectedChartType !== 'pie' ? {
          y: {
            beginAtZero: true
          }
        } : undefined
      }
    });
  }

  downloadFile(file: ProcessedFile) {
    if (!file.blob) return;
    
    const url = window.URL.createObjectURL(file.blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `processed_${file.name.split('.')[0]}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
    this.toastService.success('Download started');
  }
}
