import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticDashboardComponent } from '../../components/managements/statistic-dashboard/statistic-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticDashboardRoutingModule {}
