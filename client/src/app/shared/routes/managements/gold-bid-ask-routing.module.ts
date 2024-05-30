import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoldBidAskComponent } from '../../components/managements/gold-bid-ask/gold-bid-ask.component';
import { authGuard } from '../../../core/guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: GoldBidAskComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoldBidAskRoutingModule {}
