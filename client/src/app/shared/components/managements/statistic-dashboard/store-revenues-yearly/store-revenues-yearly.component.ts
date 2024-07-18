import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../../../../core/services/dashboard/dashboard.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RevenuesDataModel } from '../../../../../core/models/counter-revenue.model';
import { GenericDropdownComponent } from '../../../generic-dropdown/generic-dropdown.component';
import { DropdownModel } from '../../../../../core/models/dropdown.model';
Chart.register(...registerables);

@Component({
  selector: 'chart-store-revenues-yearly',
  standalone: true,
  imports: [CommonModule, FormsModule, GenericDropdownComponent],
  templateUrl: './store-revenues-yearly.component.html',
  styleUrls: ['./store-revenues-yearly.component.scss'],
})
export class StoreRevenuesYearlyComponent implements OnInit, OnDestroy {
  chartdata: RevenuesDataModel[] = [];
  labeldata: number[] = [];
  realdata: number[] = [];
  selectedYear: number = new Date().getFullYear(); // current default year
  chart: Chart | null = null; // chart reference
  yearDropdown: DropdownModel[] = [
    {
      name: 2023,
      value: 2023
    },
    {
      name: 2024,
      value: 2024
    }
  ];

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.loadChartData(this.selectedYear);
  }

  /**
   * Select year from the dropdown
   * @param $event
   */
  onSelectChangeYearFromParent($event: any) {
    this.selectedYear = $event.value;
    this.loadChartData(this.selectedYear);
  }

  loadChartData(year: number): void {
    this.service.getRevenuesData(year).subscribe(
      (item) => {
        this.chartdata = item;

        if (!this.chartdata || this.chartdata.length === 0) {
          console.warn('No data available for the selected year.');
          this.clearChart();
          return;
        }

        this.labeldata = [];
        this.realdata = [];
        this.chartdata.forEach((o) => {
          this.labeldata.push(o.month);
          this.realdata.push(o.revenue);
        });

        // Clear chart before re-rendering
        this.clearChart();

        // Render new chart
        this.Renderlinechart(this.labeldata, this.realdata);
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.clearChart();
      }
    );
  }

  Renderlinechart(labeldata: any, valuedata: any): void {
    this.Renderchart(labeldata, valuedata, 'linechart1', 'line');
  }

  Renderchart(
    labeldata: any,
    valuedata: any,
    chartid: string,
    charttype: any
  ): void {
    // Clear old chart before rendering new chart
    this.clearChart();

    // Create new chart
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
            tension: 0.1,
          },
        ],
      },
      options: {
        plugins: {
          // No data labels
          datalabels: false,
        },
        scales: {
          y: {
            beginAtZero: true,
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
    // Clear chart on component destroy
    this.clearChart();
  }
}
