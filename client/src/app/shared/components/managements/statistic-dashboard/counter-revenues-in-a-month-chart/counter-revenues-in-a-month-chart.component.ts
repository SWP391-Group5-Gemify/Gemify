import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../../../../core/services/dashboard/dashboard.service';
import { RevenueSaleCounterModel } from '../../../../../core/models/counter-revenue.model';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-counter-revenues-in-a-month-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './counter-revenues-in-a-month-chart.component.html',
  styleUrls: ['./counter-revenues-in-a-month-chart.component.scss'],
})
export class CounterRevenuesInAMonthChartComponent
  implements OnInit, OnDestroy
{
  chartData: RevenueSaleCounterModel[] = [];
  labelData: string[] = [];
  revenueData: number[] = [];
  selectedYear: number = 2024;
  selectedMonth: number = 1;
  years: number[] = [2024, 2025, 2026];
  months: { value: number; label: string }[] = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];
  chart: Chart | null = null;

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.loadChartData(this.selectedYear, this.selectedMonth);
  }

  onYearChange(event: Event): void {
    this.selectedYear = Number((event.target as HTMLSelectElement).value);
    this.loadChartData(this.selectedYear, this.selectedMonth);
  }

  onMonthChange(event: Event): void {
    this.selectedMonth = Number((event.target as HTMLSelectElement).value);
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
  
        this.labelData = data.map((item) => item.saleCounterName); // Sử dụng saleCounterName thay vì saleCounterId
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