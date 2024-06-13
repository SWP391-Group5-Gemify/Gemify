import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuybackComponent } from '../../components/managements/buyback/buyback.component';

const routes: Routes = [
  {
    path: '',
    component: BuybackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuybackRoutingModule {}
