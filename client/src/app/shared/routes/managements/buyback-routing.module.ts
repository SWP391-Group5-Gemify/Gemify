import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuybackComponent } from '../../components/managements/buyback/buyback.component';
import { authGuard } from '../../../core/guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BuybackComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuybackRoutingModule {}
