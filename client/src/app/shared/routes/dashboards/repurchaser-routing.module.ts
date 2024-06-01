import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../../core/guard/auth/auth.guard';
import { RepurchaserComponent } from '../../components/dashboards/repurchaser/repurchaser.component';
import { roleGuard } from '../../../core/guard/authorization/role.guard';

const routes: Routes = [
  {
    path: '',
    component: RepurchaserComponent,
    canActivate: [authGuard, roleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepurchaserRoutingModule {}
