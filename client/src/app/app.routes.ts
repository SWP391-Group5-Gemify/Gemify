import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';

import { GoldChartComponent } from './shared/components/gold-chart/gold-chart.component';
import { authGuard } from './core/guard/auth/auth.guard';
import { AdminDashboardComponent } from './shared/components/dashboards/admin-dashboard/admin-dashboard.component';
import { StoreManagerDashboardComponent } from './shared/components/dashboards/store-manager-dashboard/store-manager-dashboard.component';
import { CashierDashboardComponent } from './shared/components/dashboards/cashier-dashboard/cashier-dashboard.component';
import { RepurchaserDashboardComponent } from './shared/components/dashboards/repurchaser-dashboard/repurchaser-dashboard.component';
import { SellerDashboardComponent } from './shared/components/dashboards/seller-dashboard/seller-dashboard.component';
import { AppraiserDashboardComponent } from './shared/components/dashboards/appraiser-dashboard/appraiser-dashboard.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'prefix' },
  {
    path: 'gold-chart',
    component: GoldChartComponent,
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'store-manager',
    component: StoreManagerDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cashier',
    component: CashierDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'repurchaser',
    component: RepurchaserDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'seller',
    component: SellerDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'appraiser',
    component: AppraiserDashboardComponent,
    canActivate: [authGuard],
  },
];
