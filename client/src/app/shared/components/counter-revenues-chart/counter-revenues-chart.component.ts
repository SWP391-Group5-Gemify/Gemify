import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../../../app/core/services/dashboard/dashboard.service';
import { MonthlyRevenue } from '../../../core/models/counter-revenue.model';
import ChartDataLabels from 'chartjs-plugin-datalabels';  // Import the plugin
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

Chart.register(...registerables, ChartDataLabels);  // Register the plugin

@Component({
  selector: 'app-counter-revenues-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './counter-revenues-chart.component.html',
  styleUrls: ['./counter-revenues-chart.component.scss']
})
export class CounterRevenuesChartComponent implements OnInit, OnDestroy {
  chartData: MonthlyRevenue[] = [];
  labelData: number[] = [];
  realData: number[][] = [[], [], [], [], [], []]; // Assuming 6 counters
  selectedYear: number = 2024;
  years: number[] = [2023, 2024, 2025, 2026];
  chart: Chart | null = null;

  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.loadChartData(this.selectedYear);
  }

  onYearChange(event: Event): void {
    this.selectedYear = Number((event.target as HTMLSelectElement).value);
    this.loadChartData(this.selectedYear);
  }

  loadChartData(year: number): void {
    this.service.getSpecificCounterRevenuesData(year).subscribe(
      data => {
        this.chartData = data;

        if (!this.chartData || this.chartData.length === 0) {
          console.warn('No data available for the selected year.');
          this.clearChart();
          return;
        }

        this.labelData = this.chartData.map(o => o.month);
        this.realData = [[], [], [], [], [], []];

        this.chartData.forEach(monthlyData => {
          monthlyData.saleCounterRevenueByMonths.forEach(counterData => {
            const counterIndex = counterData.saleCounterId - 1;
            this.realData[counterIndex].push(counterData.revenue);
          });
        });

        this.clearChart();
        this.renderStackedColumnChart(this.labelData, this.realData);
      },
      error => {
        console.error('Error fetching data:', error);
        this.clearChart();
      }
    );
  }

  renderStackedColumnChart(labelData: number[], realData: number[][]): void {
    const chartId = 'columnchart';
    const chartType = 'bar';

    // Chuyển đổi dữ liệu để phù hợp với biểu đồ cột chồng lên nhau
    const datasets = realData.map((data, index) => {
      const counterNames = [
        'Quầy nhẫn',
        'Quầy dây chuyền',
        'Quầy bông tai',
        'Quầy lắc',
        'Quầy mặt dây chuyền',
        'Quầy vàng tài lộc'
      ];
      const colors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ];

      return {
        label: counterNames[index],
        data: data,
        backgroundColor: colors[index],
        borderColor: colors[index],
        borderWidth: 1
      };
    });

    this.chart = new Chart(chartId, {
      type: chartType,
      data: {
        labels: labelData,
        datasets: datasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          datalabels: {
            color: 'white',
            display: true,
            formatter: (value: number) => {
              // Định dạng số với dấu phân tách hàng nghìn
              const formattedValue = new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(value);
              
              // Thay thế dấu phẩy thành dấu chấm
              return formattedValue.replace(/,/g, '.');
            },
            anchor: 'end',
            align: 'top',
            font: {
              size: 10,
              weight: 'bold'
            }
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true,
            beginAtZero: true
          }
        }
      }
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
