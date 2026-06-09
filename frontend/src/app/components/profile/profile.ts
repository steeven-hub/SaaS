import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {
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
      error: () => {
        this.toastService.error('Failed to load profile.');
      }
    });
  }

  updateProfile() {
    this.profileService.updateProfile(this.user).subscribe({
      next: () => {
        this.toastService.success('Profile updated successfully!');
      },
      error: () => {
        this.toastService.error('Failed to update profile.');
      }
    });
  }
}
