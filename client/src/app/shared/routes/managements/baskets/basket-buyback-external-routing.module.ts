import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketBuybackExternalComponent } from '../../../components/managements/basket-buyback-external/basket-buyback-external.component';

const routes: Routes = [
  {
    path: '',
    component: BasketBuybackExternalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasketBuybackExternalRoutingModule {}
