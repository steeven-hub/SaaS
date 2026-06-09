import { Component } from '@angular/core';
import { BillingService } from '../../services/billing';

@Component({
  selector: 'app-billing',
  standalone: true,
  templateUrl: './billing.html',
  styleUrl: './billing.css'
})
export class BillingComponent {
  constructor(private billingService: BillingService) {}

  subscribe(plan: string) {
    this.billingService.createCheckoutSession(plan).subscribe(response => {
      window.location.href = response.url;
    });
  }
}
