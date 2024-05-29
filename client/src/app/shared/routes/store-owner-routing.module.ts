import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/guard/auth/auth.guard';
import { StoreOwnerComponent } from '../components/dashboards/store-owner/store-owner.component';

const routes: Routes = [
  {
    path: '',
    component: StoreOwnerComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreOwnerRoutingModule {}
