import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from '../../components/dashboards/seller/seller.component';

const routes: Routes = [
  {
    path: '',
    component: SellerComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'prefix',
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../../routes/managements/products-routing.module').then(
            (m) => m.ProductsRoutingModule
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
export class SellerRoutingModule {}
