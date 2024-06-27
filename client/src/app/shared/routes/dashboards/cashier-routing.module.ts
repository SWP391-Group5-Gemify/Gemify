import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashierComponent } from '../../components/dashboards/cashier/cashier.component';

const routes: Routes = [
  {
    path: '',
    component: CashierComponent,
    children: [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full',
      },
      {
        path: 'baskets',
        loadChildren: () =>
          import('../../routes/managements/basket-routing.module').then(
            (m) => m.BasketRoutingModule
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
      {
        path: 'checkout',
        loadChildren: () =>
          import('../managements/checkout-routing.module').then(
            (m) => m.CheckoutRoutingModule
          ),
      },
      {
        path: '**',
        redirectTo: 'orders',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashierRoutingModule {}
