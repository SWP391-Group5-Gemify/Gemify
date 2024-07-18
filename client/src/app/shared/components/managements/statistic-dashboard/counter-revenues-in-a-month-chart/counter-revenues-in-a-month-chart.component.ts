import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../../../../core/services/dashboard/dashboard.service';
import { RevenueSaleCounterModel } from '../../../../../core/models/counter-revenue.model';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModel } from '../../../../../core/models/dropdown.model';
import { GenericDropdownComponent } from '../../../generic-dropdown/generic-dropdown.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs';

Chart.register(...registerables, ChartDataLabels);

@UntilDestroy()
@Component({
  selector: 'app-counter-revenues-in-a-month-chart',
  standalone: true,
  imports: [CommonModule, FormsModule, GenericDropdownComponent],
  templateUrl: './counter-revenues-in-a-month-chart.component.html',
  styleUrls: ['./counter-revenues-in-a-month-chart.component.scss'],
})
export class CounterRevenuesInAMonthChartComponent
  implements OnInit, OnDestroy
{
  chartData: RevenueSaleCounterModel[] = [];
  labelData: string[] = [];
  revenueData: number[] = [];
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = 1;
  yearDropdown: DropdownModel[] = [];
  monthDropdown: { value: number; name: string }[] = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' },
  ];
  chart: Chart | null = null;

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.loadChartData(this.selectedYear, this.selectedMonth);
    this.getYears();
  }

  /**
   * Select year from the dropdown
   * @param $event
   */
  onSelectChangeYearFromParent($event: any) {
    this.selectedYear = $event.value;
    this.loadChartData(this.selectedYear, this.selectedMonth);
  }

  /**
   * Select month from the dropdown
   * @param $event
   */
  onSelectChangeMonthFromParent($event: any) {
    this.selectedMonth = $event.value;
    this.loadChartData(this.selectedYear, this.selectedMonth);
  }
  
  loadChartData(year: number, month: number): void {
    this.service.getSpecificCounterRevenuesInMonthData(year, month).subscribe(
      (data) => {
        if (!data || data.length === 0) {
          console.warn('No data available for the selected month and year.');
          this.clearChart();
          return;
        }

        this.labelData = data.map((item) => item.saleCounterName); // Convert saleCounterId to string
        this.revenueData = data.map((item) => item.revenue);
  
        this.clearChart();
        this.renderColumnChart(this.labelData, this.revenueData);
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.clearChart();
      }
    );
  }

  getYears() {
    this.service.getYears().pipe(
      untilDestroyed(this),
      map((years: number[]) => {
        return years.map((year: number) => ({
          value: year,
          name: year,
        }));
      })
    )
    .subscribe({
      next: (years: any) => {
        this.yearDropdown = years;
      },

      error(err) {
        console.error(err);
      },
    });
  }

  renderColumnChart(labelData: string[], revenueData: number[]): void {
    const chartId = 'columnchart1';
    const chartType = 'bar';

    this.chart = new Chart(chartId, {
      type: chartType,
      data: {
        labels: labelData,
        datasets: [
          {
            label: 'Revenue',
            data: revenueData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            color: 'black',
            display: true,
            formatter: (value: number) => {
              const formattedValue = new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(value);
              return formattedValue.replace(/,/g, '.');
            },
            anchor: 'end',
            align: 'top',
            font: {
              size: 12,
              weight: 'bold',
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
            max: 100000000,
            ticks: {
              callback: (tickValue: string | number) => {
                if (typeof tickValue === 'number') {
                  return new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                    .format(tickValue)
                    .replace(/,/g, '.');
                }
                return tickValue;
              },
            },
          },
        },
      },
    });
  }

  clearChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  ngOnDestroy(): void {
    this.clearChart();
  }
}