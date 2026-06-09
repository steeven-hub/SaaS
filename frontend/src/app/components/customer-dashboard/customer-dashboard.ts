import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-dashboard.html',
  styleUrl: './customer-dashboard.css'
})
export class CustomerDashboardComponent implements OnInit {
  user: any = null;

  constructor(
    private profileService: ProfileService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        this.toastService.error('Failed to load profile.');
      }
    });
  }

  copyLink() {
    if (this.user?.affiliate_code) {
      const link = `https://apexengine.io/ref/${this.user.affiliate_code}`;
      navigator.clipboard.writeText(link);
      this.toastService.success('Link copied to clipboard!');
    }
  }
}
