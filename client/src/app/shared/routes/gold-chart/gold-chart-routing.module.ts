import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoldChartComponent } from '../../components/gold-chart/gold-chart.component';

const routes: Routes = [
  {
    path: '',
    component: GoldChartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoldChartRoutingModule {}
