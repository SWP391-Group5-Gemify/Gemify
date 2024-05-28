import { Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { GoldChartComponent } from './gold-chart/gold-chart.component';
import { AdminDashboardComponent } from './shared/components/admin-dashboard/admin-dashboard.component';
import { authGuard } from './core/guard/auth.guard';

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
