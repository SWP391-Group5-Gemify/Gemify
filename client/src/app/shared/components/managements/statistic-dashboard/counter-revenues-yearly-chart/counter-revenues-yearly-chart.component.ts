import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HttpClient } from '@angular/common/http';
import { Revenue } from './../../../../../core/models/counter-revenue.model'; // Import the Revenue model
import { map, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../../../../core/services/dashboard/dashboard.service';
import { DropdownModel } from '../../../../../core/models/dropdown.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GenericDropdownComponent } from '../../../generic-dropdown/generic-dropdown.component';

Chart.register(...registerables, ChartDataLabels);

@UntilDestroy()
@Component({
  selector: 'app-counter-revenues-yearly-chart',
  standalone: true,
  imports: [CommonModule, FormsModule, GenericDropdownComponent],
  templateUrl: './counter-revenues-yearly-chart.component.html',
  styleUrls: ['./counter-revenues-yearly-chart.component.scss']
})
export class CounterRevenuesYearlyChartComponent implements OnInit, OnDestroy {
  chart: Chart<'pie', number[], string> | null = null;
  private dataSubscription: Subscription | null = null;
  selectedYear: number = new Date().getFullYear(); // current default year
  yearDropdown: DropdownModel[] = [];

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.getYears();
    this.fetchData(this.selectedYear);
  }

  /**
   * Select year from the dropdown
   * @param $event
   */
  onSelectChangeYearFromParent($event: any) {
    this.selectedYear = $event.value;
    this.fetchData(this.selectedYear);
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

  fetchData(year: number): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    this.dataSubscription = this.service.getSpecificCounterYearlyRevenuesData(year).subscribe(
      data => {
        this.createPieChart(data);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  createPieChart(data: Revenue[]): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;

    if (!ctx) {
      console.error("Canvas element with id 'pieChart' not found.");
      return;
    }

    const chartConfig: ChartConfiguration<'pie', number[], string> = {
      type: 'pie',
      data: {
        labels: data.map(item => item.saleCounterName),
        datasets: [{
          data: data.map(item => item.revenue),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
            title: {
              display: true,
              text: 'Doanh Thu Các Quầy Theo Năm',
              padding: {
                  top: 10,
                  bottom: 30
              }
          },
          datalabels: {
            formatter: (value) => new Intl.NumberFormat('de-DE').format(value),
            color: '#fff',
            font: { 
              weight: 'bold',
              size: 20
            }
          },
          legend: { 
            position: 'top'
          }
        },
        
      }
    };

    if (this.chart) {
      this.chart.destroy();
    }

    try {
      this.chart = new Chart(ctx, chartConfig);
    } catch (error) {
      console.error('Error creating chart:', error);
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}