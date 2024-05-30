import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from '../../components/managements/orders/orders.component';
import { authGuard } from '../../../core/guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
