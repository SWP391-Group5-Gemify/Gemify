import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { RoleEnum } from './core/models/role.model';
import { authGuard, roleGuard } from './core/guards';
import { PageErrorComponent } from './core/layout/page-error/page-error.component';
import { GoldChartComponent } from './shared/components/gold-chart/gold-chart.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'gold-chart',
    loadChildren: () =>
      import('./shared/routes/gold-chart/gold-chart-routing.module').then(
        (m) => m.GoldChartRoutingModule
      ),
  },

  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./shared/routes/forgot-password/forgot-password-routing.module').then(
        (m) => m.ForgotPasswordRoutingModule
      ),
  },

  {
    path: 'reset-password',
    loadChildren: () =>
      import('./shared/routes/reset-password/reset-password-routing.module').then(
        (m) => m.ResetPasswordRoutingModule
      ),
  },
  // === Error Pages ========================================================
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
  {
    path: 'unauthorized',
    component: PageErrorComponent,
    data: { statusCode: 401, msg: 'You are not authorized' },
  },
  // ===========================================================
  {
    path: 'store-owner',
    loadChildren: () =>
      import('./shared/routes/dashboards/store-owner-routing.module').then(
        (m) => m.StoreOwnerRoutingModule
      ),
    canActivate: [authGuard, roleGuard],
    data: {
      role: [RoleEnum.StoreOwner],
    },
  },
  {
    path: 'store-manager',
    loadChildren: () =>
      import('./shared/routes/dashboards/store-manager-routing.module').then(
        (m) => m.StoreManagerRoutingModule
      ),
    canActivate: [authGuard, roleGuard],
    data: {
      role: [RoleEnum.StoreManager],
    },
  },
  {
    path: 'cashier',
    loadChildren: () =>
      import('./shared/routes/dashboards/cashier-routing.module').then(
        (m) => m.CashierRoutingModule
      ),
    canActivate: [authGuard, roleGuard],
    data: {
      role: [RoleEnum.Cashier],
    },
  },

  {
    path: 'seller',
    loadChildren: () =>
      import('./shared/routes/dashboards/seller-routing.module').then(
        (m) => m.SellerRoutingModule
      ),
    canActivate: [authGuard, roleGuard],
    data: {
      role: [RoleEnum.Seller],
    },
  },
  {
    path: 'repurchaser',
    loadChildren: () =>
      import('./shared/routes/dashboards/repurchaser-routing.module').then(
        (m) => m.RepurchaserRoutingModule
      ),
    canActivate: [authGuard, roleGuard],
    data: {
      role: [RoleEnum.Repurchaser],
    },
  },

  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
