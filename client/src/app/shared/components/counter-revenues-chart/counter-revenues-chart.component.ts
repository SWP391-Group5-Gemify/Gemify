import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../../../app/core/services/dashboard/dashboard.service';
import { revenuesData } from '../../../core/models/revenuesData.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
Chart.register(...registerables);

@Component({
  selector: 'app-counter-revenues-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './counter-revenues-chart.component.html',
  styleUrl: './counter-revenues-chart.component.scss'
})
export class CounterRevenuesChartComponent implements OnInit, OnDestroy {
  chartdata: revenuesData[] = [];
  labeldata: number[] = [];
  realdata: number[] = [];
  selectedYear: number = 2024; // Năm mặc định
  years: number[] = [2023, 2024, 2025, 2026]; // Các năm có thể chọn
  chart: Chart | null = null; // Tham chiếu đến biểu đồ

  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.loadchartdata(this.selectedYear);
  }

  onYearChange(event: Event): void {
    this.selectedYear = Number((event.target as HTMLSelectElement).value);
    this.loadchartdata(this.selectedYear);
  }

  loadchartdata(year: number): void {
    this.service.getCounterRevenuesData(year).subscribe(
      item => {
        this.chartdata = item;

        if (!this.chartdata || this.chartdata.length === 0) {
          console.warn('No data available for the selected year.');
          this.clearChart();
          return;
        }

        this.labeldata = [];
        this.realdata = [];
        this.chartdata.forEach(o => {
          this.labeldata.push(o.month);
          this.realdata.push(o.revenue);
        });

        // Xóa biểu đồ cũ nếu có
        this.clearChart();

        // Vẽ biểu đồ mới
        this.Renderlinechart(this.labeldata, this.realdata);
      },
      error => {
        console.error('Error fetching data:', error);
        this.clearChart();
      }
    );
  }

  Renderlinechart(labeldata: any, valuedata: any): void {
    this.Renderchart(labeldata, valuedata, 'linechart', 'line');
  }

  Renderchart(labeldata: any, valuedata: any, chartid: string, charttype: any): void {
    // Xóa biểu đồ cũ nếu có trước khi tạo biểu đồ mới
    this.clearChart();

    // Tạo biểu đồ mới
    this.chart = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Monthly sales',
            data: valuedata,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
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
    // Hủy biểu đồ khi component bị hủy
    this.clearChart();
  }

}
