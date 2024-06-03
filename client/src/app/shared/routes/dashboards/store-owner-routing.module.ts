import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../../core/guard/auth/auth.guard';
import { StoreOwnerComponent } from '../../components/dashboards/store-owner/store-owner.component';
import { roleGuard } from '../../../core/guard/roles/role.guard';

const routes: Routes = [
  {
    path: '',
    component: StoreOwnerComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'StoreOwner',
    },
    children: [
      {
        path: '',
        redirectTo: 'statistic-dashboard',
        pathMatch: 'full',
      },
      {
        path: 'statistic-dashboard',
        loadChildren: () =>
          import(
            '../../routes/managements/statistic-dashboard-routing.module'
          ).then((m) => m.StatisticDashboardRoutingModule),
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('../../routes/managements/employees-routing.module').then(
            (m) => m.EmployeesRoutingModule
          ),
      },
      {
        path: 'counters',
        loadChildren: () =>
          import('../../routes/managements/counters-routing.module').then(
            (m) => m.CountersRoutingModule
          ),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('../../routes/managements/customers-routing.module').then(
            (m) => m.CustomersRoutingModule
          ),
      },
      {
        path: 'promotions',
        loadChildren: () =>
          import('../../routes/managements/promotions-routing.module').then(
            (m) => m.PromotionsRoutingModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../../routes/managements/products-routing.module').then(
            (m) => m.ProductsRoutingModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('../../routes/managements/orders-routing.module').then(
            (m) => m.OrdersRoutingModule
          ),
      },
      {
        path: 'loyalty',
        loadChildren: () =>
          import('../../routes/managements/loyalty-routing.module').then(
            (m) => m.LoyaltyRoutingModule
          ),
      },
      {
        path: 'exchange',
        loadChildren: () =>
          import('../../routes/managements/exchange-routing.module').then(
            (m) => m.ExchangeRoutingModule
          ),
      },
      {
        path: 'gold-bid-ask',
        loadChildren: () =>
          import('../../routes/managements/gold-bid-ask-routing.module').then(
            (m) => m.GoldBidAskRoutingModule
          ),
      },
      {
        path: 'buyback',
        loadChildren: () =>
          import('../../routes/managements/buyback-routing.module').then(
            (m) => m.BuybackRoutingModule
          ),
      },
      {
        path: 'warranty',
        loadChildren: () =>
          import('../../routes/managements/warranty-routing.module').then(
            (m) => m.WarrantyRoutingModule
          ),
      },
      { path: '', redirectTo: 'statistic-dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreOwnerRoutingModule {}
