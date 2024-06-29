import { Component } from '@angular/core';
import { MychartComponent } from '../../mychart/mychart.component';
import { CounterRevenuesChartComponent } from '../../counter-revenues-chart/counter-revenues-chart.component';
import { CounterRevenuesYearlyChartComponent } from '../../counter-revenues-yearly-chart/counter-revenues-yearly-chart.component';
import { CounterRevenuesInAMonthChartComponent } from '../../counter-revenues-in-a-month-chart/counter-revenues-in-a-month-chart.component';

@Component({
  selector: 'app-statistic-dashboard',
  standalone: true,
  imports: [MychartComponent, 
    CounterRevenuesChartComponent, 
    CounterRevenuesYearlyChartComponent, 
    CounterRevenuesInAMonthChartComponent],
  templateUrl: './statistic-dashboard.component.html',
  styleUrl: './statistic-dashboard.component.scss'
})
export class StatisticDashboardComponent {

}
