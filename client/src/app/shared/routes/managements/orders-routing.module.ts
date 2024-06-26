import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from '../../components/managements/orders/orders.component';
import { OrderDetailComponent } from '../../components/managements/orders/order-detail/order-detail.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
  },
  {
    path: ':id',
    component: OrderDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
