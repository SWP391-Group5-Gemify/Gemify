// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Chart, registerables } from 'chart.js';
// import { DashboardService } from '../../../../app/core/services/dashboard/dashboard.service';
// import { revenuesData } from '../../../core/models/revenuesData.model';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// Chart.register(...registerables);

// @Component({
//   selector: 'app-counter-revenues-chart',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './counter-revenues-chart.component.html',
//   styleUrl: './counter-revenues-chart.component.scss'
// })
// export class CounterRevenuesChartComponent implements OnInit, OnDestroy {
//   chartdata: revenuesData[] = [];
//   labeldata: number[] = [];
//   realdata: number[] = [];
//   selectedYear: number = 2024; // Năm mặc định
//   years: number[] = [2023, 2024, 2025, 2026]; // Các năm có thể chọn
//   chart: Chart | null = null; // Tham chiếu đến biểu đồ

//   constructor(private service: DashboardService) { }

//   ngOnInit(): void {
//     this.loadchartdata(this.selectedYear);
//   }

//   onYearChange(event: Event): void {
//     this.selectedYear = Number((event.target as HTMLSelectElement).value);
//     this.loadchartdata(this.selectedYear);
//   }

//   loadchartdata(year: number): void {
//     this.service.getCounterRevenuesData(year).subscribe(
//       item => {
//         this.chartdata = item;

//         if (!this.chartdata || this.chartdata.length === 0) {
//           console.warn('No data available for the selected year.');
//           this.clearChart();
//           return;
//         }

//         this.labeldata = [];
//         this.realdata = [];
//         this.chartdata.forEach(o => {
//           this.labeldata.push(o.month);
//           this.realdata.push(o.revenue);
//         });

//         // Xóa biểu đồ cũ nếu có
//         this.clearChart();

//         // Vẽ biểu đồ mới
//         this.Renderlinechart(this.labeldata, this.realdata);
//       },
//       error => {
//         console.error('Error fetching data:', error);
//         this.clearChart();
//       }
//     );
//   }

//   Renderlinechart(labeldata: any, valuedata: any): void {
//     this.Renderchart(labeldata, valuedata, 'linechart', 'line');
//   }

//   Renderchart(labeldata: any, valuedata: any, chartid: string, charttype: any): void {
//     // Xóa biểu đồ cũ nếu có trước khi tạo biểu đồ mới
//     this.clearChart();

//     // Tạo biểu đồ mới
//     this.chart = new Chart(chartid, {
//       type: charttype,
//       data: {
//         labels: labeldata,
//         datasets: [
//           {
//             label: 'Monthly sales',
//             data: valuedata,
//             borderColor: 'rgba(75, 192, 192, 1)',
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             fill: true,
//             tension: 0.1
//           }
//         ]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     });
//   }

//   clearChart(): void {
//     if (this.chart) {
//       this.chart.destroy();
//       this.chart = null;
//     }
//   }

//   ngOnDestroy(): void {
//     // Hủy biểu đồ khi component bị hủy
//     this.clearChart();
//   }

// }

// src/app/shared/components/counter-revenues-chart/counter-revenues-chart.component.ts

// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Chart, registerables } from 'chart.js';
// import { DashboardService } from '../../../../app/core/services/dashboard/dashboard.service';
// import { MonthlyRevenue, SaleCounterRevenue } from '../../../core/models/counter-revenue.model';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// Chart.register(...registerables);

// @Component({
//   selector: 'app-counter-revenues-chart',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './counter-revenues-chart.component.html',
//   styleUrls: ['./counter-revenues-chart.component.scss']
// })
// export class CounterRevenuesChartComponent implements OnInit, OnDestroy {
//   chartData: MonthlyRevenue[] = [];
//   labelData: number[] = [];
//   realData: number[][] = [[], [], [], [], [], []];
//   selectedYear: number = 2024;
//   years: number[] = [2023, 2024, 2025, 2026];
//   chart: Chart | null = null;

//   constructor(private service: DashboardService) { }

//   ngOnInit(): void {
//     this.loadChartData(this.selectedYear);
//   }

//   onYearChange(event: Event): void {
//     this.selectedYear = Number((event.target as HTMLSelectElement).value);
//     this.loadChartData(this.selectedYear);
//   }

//   loadChartData(year: number): void {
//     this.service.getSpecificCounterRevenuesData(year).subscribe(
//       data => {
//         this.chartData = data;

//         if (!this.chartData || this.chartData.length === 0) {
//           console.warn('No data available for the selected year.');
//           this.clearChart();
//           return;
//         }

//         this.labelData = this.chartData.map(o => o.month);
//         this.realData = [[], [], [], [], [], []];

//         this.chartData.forEach(monthlyData => {
//           monthlyData.saleCounterRevenueByMonths.forEach(counterData => {
//             const counterIndex = counterData.saleCounterId - 1;
//             this.realData[counterIndex].push(counterData.revenue);
//           });
//         });

//         this.clearChart();
//         this.renderLineChart(this.labelData, this.realData);
//       },
//       error => {
//         console.error('Error fetching data:', error);
//         this.clearChart();
//       }
//     );
//   }

//   renderLineChart(labelData: number[], realData: number[][]): void {
//     const chartId = 'linechart';
//     const chartType = 'line';
//     this.chart = new Chart(chartId, {
//       type: chartType,
//       data: {
//         labels: labelData,
//         datasets: [
//           {
//             label: 'Counter 1',
//             data: realData[0],
//             borderColor: 'rgba(255, 99, 132, 1)',
//             //backgroundColor: 'rgba(255, 99, 132, 0.2)',
//             //fill: true,
//             tension: 0.1
//           },
//           {
//             label: 'Counter 2',
//             data: realData[1],
//             borderColor: 'rgba(54, 162, 235, 1)',
//             //backgroundColor: 'rgba(54, 162, 235, 0.2)',
//             //fill: true,
//             tension: 0.1
//           },
//           {
//             label: 'Counter 3',
//             data: realData[2],
//             borderColor: 'rgba(255, 206, 86, 1)',
//             //backgroundColor: 'rgba(255, 206, 86, 0.2)',
//             //fill: true,
//             tension: 0.1
//           },
//           {
//             label: 'Counter 4',
//             data: realData[3],
//             borderColor: 'rgba(75, 192, 192, 1)',
//             //backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             //fill: true,
//             tension: 0.1
//           },
//           {
//             label: 'Counter 5',
//             data: realData[4],
//             borderColor: 'rgba(153, 102, 255, 1)',
//             //backgroundColor: 'rgba(153, 102, 255, 0.2)',
//             //fill: true,
//             tension: 0.1
//           },
//           {
//             label: 'Counter 6',
//             data: realData[5],
//             borderColor: 'rgba(255, 159, 64, 1)',
//             //backgroundColor: 'rgba(255, 159, 64, 0.2)',
//             //fill: true,
//             tension: 0.1
//           }
//         ]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     });
//   }

//   clearChart(): void {
//     if (this.chart) {
//       this.chart.destroy();
//       this.chart = null;
//     }
//   }

//   ngOnDestroy(): void {
//     this.clearChart();
//   }
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../../../app/core/services/dashboard/dashboard.service';
import { MonthlyRevenue, SaleCounterRevenue } from '../../../core/models/counter-revenue.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

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
        this.renderLineChart(this.labelData, this.realData);
      },
      error => {
        console.error('Error fetching data:', error);
        this.clearChart();
      }
    );
  }

  renderLineChart(labelData: number[], realData: number[][]): void {
    const chartId = 'linechart';
    const chartType = 'line';
    this.chart = new Chart(chartId, {
      type: chartType,
      data: {
        labels: labelData,
        datasets: [
          {
            label: 'Quầy nhẫn', // Counter 1
            data: realData[0],
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.1
          },
          {
            label: 'Quầy dây chuyền', // Counter 2
            data: realData[1],
            borderColor: 'rgba(54, 162, 235, 1)',
            tension: 0.1
          },
          {
            label: 'Quầy bông tai', // Counter 3
            data: realData[2],
            borderColor: 'rgba(255, 206, 86, 1)',
            tension: 0.1
          },
          {
            label: 'Quầy lắc', // Counter 4
            data: realData[3],
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1
          },
          {
            label: 'Quầy mặt dây chuyền', // Counter 5
            data: realData[4],
            borderColor: 'rgba(153, 102, 255, 1)',
            tension: 0.1
          },
          {
            label: 'Quầy vàng tài lộc', // Counter 6
            data: realData[5],
            borderColor: 'rgba(255, 159, 64, 1)',
            tension: 0.1
          }
        ]
      },
      options: {
        scales: {
          y: {
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
