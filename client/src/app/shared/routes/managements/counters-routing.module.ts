import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountersComponent } from '../../components/managements/counters/counters.component';
import { authGuard } from '../../../core/guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CountersComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountersRoutingModule {}
