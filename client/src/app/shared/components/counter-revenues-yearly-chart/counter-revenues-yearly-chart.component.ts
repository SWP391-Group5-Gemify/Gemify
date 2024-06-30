// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-counter-revenues-yearly-chart',
// //   standalone: true,
// //   imports: [],
// //   templateUrl: './counter-revenues-yearly-chart.component.html',
// //   styleUrl: './counter-revenues-yearly-chart.component.scss'
// // })
// // export class CounterRevenuesYearlyChartComponent {

// // }

import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-counter-revenues-yearly-chart',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './counter-revenues-yearly-chart.component.html',
  styleUrls: ['./counter-revenues-yearly-chart.component.scss']
})
export class CounterRevenuesYearlyChartComponent implements OnInit, OnDestroy {
  chart: Chart<'pie', number[], string> | null = null; // Xác định kiểu Chart phù hợp

  // Các dữ liệu ví dụ
  saleCounterRevenues = [
    { "revenue": 117000000, "saleCounterId": 1 },
    { "revenue": 141600000, "saleCounterId": 2 },
    { "revenue": 177800000, "saleCounterId": 3 },
    { "revenue": 425600000, "saleCounterId": 4 },
    { "revenue": 236800000, "saleCounterId": 5 },
    { "revenue": 317700000, "saleCounterId": 6 }
  ];

  ngOnInit(): void {
    this.createPieChart();
  }

  createPieChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;

    if (!ctx) {
      console.error("Canvas element with id 'pieChart' not found.");
      return;
    }

    // Cấu hình dữ liệu biểu đồ
    const counterNames = [
      'Quầy nhẫn',
      'Quầy dây chuyền',
      'Quầy bông tai',
      'Quầy lắc',
      'Quầy mặt dây chuyền',
      'Quầy vàng tài lộc'
    ];

    const backgroundColors = [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)'
    ];

    const revenues = this.saleCounterRevenues.map(data => data.revenue);
    const labels = this.saleCounterRevenues.map(data => counterNames[data.saleCounterId - 1]);

    const chartConfig: ChartConfiguration<'pie', number[], string> = {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: revenues,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('0.6', '1')),
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          datalabels: {
            formatter: (value) => {
              return new Intl.NumberFormat('de-DE', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(value);
            },
            color: '#fff',
            font: {
              weight: 'bold'
            }
          },
          legend: {
            position: 'top'
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };

    try {
      this.chart = new Chart(ctx, chartConfig); // Khởi tạo biểu đồ
    } catch (error) {
      console.error('Error creating chart:', error);
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy(); // Hủy biểu đồ khi component bị hủy
    }
  }
}
