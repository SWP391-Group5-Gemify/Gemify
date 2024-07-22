import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreManagerComponent } from '../../components/dashboards/store-manager/store-manager.component';

const routes: Routes = [
  {
    path: '',
    component: StoreManagerComponent,
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
          import('../managements/promotions-routing.module').then(
            (m) => m.PromotionsRoutingModule
          ),
      },
      {
        path: 'products-management',
        loadChildren: () =>
          import(
            '../managements/products/products-management-routing.module'
          ).then((m) => m.ProductsManagementRoutingModule),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('../../routes/managements/orders-routing.module').then(
            (m) => m.OrdersRoutingModule
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
        path: '**',
        redirectTo: 'statistic-dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreManagerRoutingModule {}
