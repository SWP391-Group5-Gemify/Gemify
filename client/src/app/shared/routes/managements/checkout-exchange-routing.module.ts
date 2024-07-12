import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutExchangeComponent } from '../../components/checkout-exchange/checkout-exchange.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutExchangeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutExchangeRoutingModule {}