import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../../core/guard/auth/auth.guard';
import { CashierComponent } from '../../components/dashboards/cashier/cashier.component';
import { roleGuard } from '../../../core/guard/roles/role.guard';

const routes: Routes = [
  {
    path: '',
    component: CashierComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'Cashier',
    },
    children: [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full',
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('../../routes/managements/orders-routing.module').then(
            (m) => m.OrdersRoutingModule
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
        path: 'products',
        loadChildren: () =>
          import('../../routes/managements/products-routing.module').then(
            (m) => m.ProductsRoutingModule
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
        path: 'exchange',
        loadChildren: () =>
          import('../../routes/managements/exchange-routing.module').then(
            (m) => m.ExchangeRoutingModule
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashierRoutingModule {}
