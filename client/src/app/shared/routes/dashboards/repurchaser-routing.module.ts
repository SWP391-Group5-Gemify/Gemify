import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepurchaserComponent } from '../../components/dashboards/repurchaser/repurchaser.component';

const routes: Routes = [
  {
    path: '',
    component: RepurchaserComponent,
    children: [
      {
        path: '',
        redirectTo: 'baskets-buyback-external',
        pathMatch: 'full',
      },
      {
        path: 'baskets',
        loadChildren: () =>
          import('../managements/baskets/basket-routing.module').then(
            (m) => m.BasketRoutingModule
          ),
      },
      {
        path: 'baskets-buyback-external',
        loadChildren: () =>
          import(
            '../managements/baskets/basket-buyback-external-routing.module'
          ).then((m) => m.BasketBuybackExternalRoutingModule),
      },
      {
        path: 'policy',
        loadChildren: () =>
          import('../managements/policy-routing.module').then(
            (m) => m.PolicyRoutingModule
          ),
      },
      {
        path: '**',
        redirectTo: 'baskets-buyback-external',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepurchaserRoutingModule {}
