import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/guard/auth/auth.guard';
import { SellerComponent } from '../components/dashboards/seller/seller.component';

const routes: Routes = [
  {
    path: '',
    component: SellerComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
