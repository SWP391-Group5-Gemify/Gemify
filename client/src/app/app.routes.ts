import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { GoldChartComponent } from './shared/components/gold-chart/gold-chart.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'gold-chart',
    component: GoldChartComponent,
  },
  {
    path: 'store-owner',
    loadChildren: () =>
      import('./shared/routes/store-owner-routing.module').then(
        (m) => m.StoreOwnerRoutingModule
      ),
  },
  {
    path: 'store-manager',
    loadChildren: () =>
      import('./shared/routes/store-manager-routing.module').then(
        (m) => m.StoreManagerRoutingModule
      ),
  },
  {
    path: 'cashier',
    loadChildren: () =>
      import('./shared/routes/cashier-routing.module').then(
        (m) => m.CashierRoutingModule
      ),
  },
  {
    path: 'repurchaser',
    loadChildren: () =>
      import('./shared/routes/repurchaser-routing.module').then(
        (m) => m.RepurchaserRoutingModule
      ),
  },
  {
    path: 'seller',
    loadChildren: () =>
      import('./shared/routes/seller-routing.module').then(
        (m) => m.SellerRoutingModule
      ),
  },
  {
    path: 'appraiser',
    loadChildren: () =>
      import('./shared/routes/appraiser-routing.module').then(
        (m) => m.AppraiserRoutingModule
      ),
  },

  // Replace with error routes later
  // - 404
  // - 500
  // - 502
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
