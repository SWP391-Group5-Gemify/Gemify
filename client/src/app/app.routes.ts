import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { AdminDashboardComponent } from './shared/components/admin-dashboard/admin-dashboard.component';
import { GoldChartComponent } from './shared/components/gold-chart/gold-chart.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'prefix' },
  {
    path: 'gold-chart',
    component: GoldChartComponent,
    pathMatch: 'prefix',
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
  },
];
