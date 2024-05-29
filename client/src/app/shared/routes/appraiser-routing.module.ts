import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/guard/auth/auth.guard';
import { AppraiserComponent } from '../components/dashboards/appraiser/appraiser.component';

const routes: Routes = [
  {
    path: '',
    component: AppraiserComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppraiserRoutingModule {}
