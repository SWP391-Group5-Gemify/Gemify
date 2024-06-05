import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../../core/guard/auth/auth.guard';
import { AppraiserComponent } from '../../components/dashboards/appraiser/appraiser.component';
import { roleGuard } from '../../../core/guard/roles/role.guard';

const routes: Routes = [
  {
    path: '',
    component: AppraiserComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'Appraiser',
    },
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppraiserRoutingModule {}
