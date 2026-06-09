import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { DashboardComponent } from './components/dashboard/dashboard';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard';
import { ChangelogComponent } from './components/changelog/changelog';
import { ArchitectureComponent } from './components/architecture/architecture';
import { EtlComponent } from './components/etl/etl';
import { BillingComponent } from './components/billing/billing';
import { ProfileComponent } from './components/profile/profile';
import { ToolsComponent } from './components/tools/tools';
import { AdminComponent } from './components/admin/admin';
import { authGuard } from './guards/auth';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'customer-dashboard', component: CustomerDashboardComponent, canActivate: [authGuard] },
  { path: 'changelog', component: ChangelogComponent },
  { path: 'architecture', component: ArchitectureComponent },
  { path: 'etl', component: EtlComponent, canActivate: [authGuard] },
  { path: 'billing', component: BillingComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'tools', component: ToolsComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
