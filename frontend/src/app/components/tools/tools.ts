import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsService } from '../../services/tools.service';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tools.html',
  styleUrl: './tools.css'
})
export class ToolsComponent {
  edaFile: File | null = null;
  subFile: File | null = null;
  sampleFile: File | null = null;

  constructor(private toolsService: ToolsService, private toast: ToastService) {}

  onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    if (type === 'eda') this.edaFile = file;
    if (type === 'sub') this.subFile = file;
    if (type === 'sample') this.sampleFile = file;
  }

  runEDA() {
    if (this.edaFile) {
      this.toolsService.runEDABaseline(this.edaFile).subscribe(res => {
        this.toast.success('EDA Completed!');
        console.log(res);
      });
    }
  }

  validate() {
    if (this.subFile && this.sampleFile) {
      this.toolsService.validateSubmission(this.subFile, this.sampleFile).subscribe(res => {
        this.toast.success(res.message);
      });
    }
  }

  getInsights() {
      // Mocking data for now
      this.toolsService.getAIInsights("column1: int, column2: float").subscribe(res => {
          this.toast.success('Insights generated!');
          console.log(res);
      });
  }

  generatePDF() {
      this.toolsService.generatePDF(["Insight 1", "Insight 2"]).subscribe(blob => {
          const url = window.URL.createObjectURL(blob);
          window.open(url);
      });
  }
}
