import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreManagerComponent } from '../../components/dashboards/store-manager/store-manager.component';
import { authGuard } from '../../../core/guard/auth/auth.guard';
import { roleGuard } from '../../../core/guard/authorization/role.guard';

const routes: Routes = [
  {
    path: '',
    component: StoreManagerComponent,
    canActivate: [authGuard, roleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreManagerRoutingModule {}
