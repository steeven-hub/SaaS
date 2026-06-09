import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastService: ToastService
  ) {}

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      this.toastService.error('Passwords do not match');
      return;
    }

    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        this.toastService.success('Account created! You can now log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'An error occurred during registration';
        this.toastService.error(this.errorMessage);
        console.error('Registration error', err);
      }
    });
  }
}
