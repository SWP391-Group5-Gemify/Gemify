import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreOwnerComponent } from '../../components/dashboards/store-owner/store-owner.component';

const routes: Routes = [
  {
    path: '',
    component: StoreOwnerComponent,
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
        path: 'promotions',
        loadChildren: () =>
          import('../managements/promotions-routing.module').then(
            (m) => m.PromotionsRoutingModule
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
        path: 'membership',
        loadChildren: () =>
          import('../managements/membership-routing.module').then(
            (m) => m.MembershipRoutingModule
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
export class StoreOwnerRoutingModule {}
