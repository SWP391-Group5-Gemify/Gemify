import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoldBidAskComponent } from '../../components/managements/gold-bid-ask/gold-bid-ask.component';
import { authGuard } from '../../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: GoldBidAskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoldBidAskRoutingModule {}
