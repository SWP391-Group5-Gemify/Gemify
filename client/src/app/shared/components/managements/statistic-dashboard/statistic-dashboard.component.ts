import { Component } from '@angular/core';
import { MychartComponent } from '../../mychart/mychart.component';
import { CounterRevenuesChartComponent } from '../../counter-revenues-chart/counter-revenues-chart.component';

@Component({
  selector: 'app-statistic-dashboard',
  standalone: true,
  imports: [MychartComponent, CounterRevenuesChartComponent],
  templateUrl: './statistic-dashboard.component.html',
  styleUrl: './statistic-dashboard.component.scss'
})
export class StatisticDashboardComponent {

}
