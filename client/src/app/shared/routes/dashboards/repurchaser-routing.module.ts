import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../../core/guard/auth/auth.guard';
import { RepurchaserComponent } from '../../components/dashboards/repurchaser/repurchaser.component';
import { roleGuard } from '../../../core/guard/roles/role.guard';

const routes: Routes = [
  {
    path: '',
    component: RepurchaserComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'Repurchaser',
    },
    children: [
      {
        path: '',
        redirectTo: 'exchange',
        pathMatch: 'full',
      },
      {
        path: 'exchange',
        loadChildren: () =>
          import('../../routes/managements/exchange-routing.module').then(
            (m) => m.ExchangeRoutingModule
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
export class RepurchaserRoutingModule {}
