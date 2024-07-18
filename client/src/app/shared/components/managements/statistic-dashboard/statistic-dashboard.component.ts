import { Component } from '@angular/core';
import { CounterRevenuesInAMonthChartComponent } from './counter-revenues-in-a-month-chart/counter-revenues-in-a-month-chart.component';
import { StoreRevenuesYearlyComponent } from './store-revenues-yearly/store-revenues-yearly.component';

@Component({
  selector: 'app-statistic-dashboard',
  standalone: true,
  imports: [
    StoreRevenuesYearlyComponent,
    CounterRevenuesInAMonthChartComponent,
  ],
  templateUrl: './statistic-dashboard.component.html',
  styleUrl: './statistic-dashboard.component.scss',
})
export class StatisticDashboardComponent {}
