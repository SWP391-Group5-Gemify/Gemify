import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreManagerComponent } from '../../components/dashboards/store-manager/store-manager.component';
import { authGuard } from '../../../core/guard/auth/auth.guard';
import { roleGuard } from '../../../core/guard/roles/role.guard';
import { RoleEnum } from '../../../core/models/role.model';

const routes: Routes = [
  {
    path: '',
    component: StoreManagerComponent,
    children: [
      {
        path: '',
        redirectTo: 'statistic-dashboard',
        pathMatch: 'prefix',
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
