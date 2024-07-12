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
        redirectTo: 'baskets',
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
          import('../managements/products/products-routing.module').then(
            (m) => m.ProductsRoutingModule
          ),
      },
      {
        path: 'promotions',
        loadChildren: () =>
          import('../managements/promotions-routing.module').then(
            (m) => m.PromotionsRoutingModule
          ),
      },
      {
        path: 'policy',
        loadChildren: () =>
          import('../managements/policy-routing.module').then(
            (m) => m.PolicyRoutingModule
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
        path: 'checkout-ex-bb',
        loadChildren: () =>
          import('../managements/checkout-ex-bb-routing.module').then(
            (m) => m.CheckoutExBbRoutingModule
          ),
      },
      {
        path: '**',
        redirectTo: 'baskets',
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
