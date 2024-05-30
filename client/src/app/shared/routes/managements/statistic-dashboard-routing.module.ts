import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticDashboardComponent } from '../../components/managements/statistic-dashboard/statistic-dashboard.component';
import { authGuard } from '../../../core/guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: StatisticDashboardComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticDashboardRoutingModule {}
