import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutExBbComponent } from '../../components/checkout-ex-bb/checkout-ex-bb.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutExBbComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutExBbRoutingModule {}
