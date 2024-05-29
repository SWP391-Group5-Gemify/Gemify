import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../../core/guard/auth/auth.guard';
import { RepurchaserComponent } from '../../components/dashboards/repurchaser/repurchaser.component';

const routes: Routes = [
  {
    path: '',
    component: RepurchaserComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepurchaserRoutingModule {}
