import { Routes } from '@angular/router';
import { FormLoginComponent } from './shared/components/form-login/form-login.component';
import { PageErrorComponent } from './core/components/page-error/page-error.component';

export const routes: Routes = [
  { path: '', component: FormLoginComponent, pathMatch: 'prefix' },
  { path: 'login', component: FormLoginComponent },

  // === Testing Purpose ========================================================
  // {
  //   path: 'validation-error',
  //   component: PageErrorComponent,
  //   data: { statusCode: 400, msg: 'You have made a Bad Request' },
  // },
  {
    path: 'not-found',
    component: PageErrorComponent,
    data: { statusCode: 404, msg: 'No resource was found' },
  },

  {
    path: 'bad-request',
    component: PageErrorComponent,
    data: { statusCode: 400, msg: 'You have made a Bad Request' },
  },

  {
    path: 'server-error',
    component: PageErrorComponent,
    data: { statusCode: 500, msg: 'Server is currently down' },
  },
  // ===========================================================

  {
    path: 'gold-chart',
    loadChildren: () =>
      import('./shared/routes/gold-chart/gold-chart-routing.module').then(
        (m) => m.GoldChartRoutingModule
      ),
  },
  {
    path: 'store-owner',
    loadChildren: () =>
      import('./shared/routes/dashboards/store-owner-routing.module').then(
        (m) => m.StoreOwnerRoutingModule
      ),
  },
  {
    path: 'store-manager',
    loadChildren: () =>
      import('./shared/routes/dashboards/store-manager-routing.module').then(
        (m) => m.StoreManagerRoutingModule
      ),
  },
  {
    path: 'cashier',
    loadChildren: () =>
      import('./shared/routes/dashboards/cashier-routing.module').then(
        (m) => m.CashierRoutingModule
      ),
  },
  {
    path: 'repurchaser',
    loadChildren: () =>
      import('./shared/routes/dashboards/repurchaser-routing.module').then(
        (m) => m.RepurchaserRoutingModule
      ),
  },
  {
    path: 'seller',
    loadChildren: () =>
      import('./shared/routes/dashboards/seller-routing.module').then(
        (m) => m.SellerRoutingModule
      ),
  },
  {
    path: 'appraiser',
    loadChildren: () =>
      import('./shared/routes/dashboards/appraiser-routing.module').then(
        (m) => m.AppraiserRoutingModule
      ),
  },

  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
