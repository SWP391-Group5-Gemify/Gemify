import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HttpClient } from '@angular/common/http';
import { Revenue } from './../../../../../core/models/counter-revenue.model'; // Import the Revenue model
import { Subscription } from 'rxjs';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-counter-revenues-yearly-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-revenues-yearly-chart.component.html',
  styleUrls: ['./counter-revenues-yearly-chart.component.scss']
})
export class CounterRevenuesYearlyChartComponent implements OnInit, OnDestroy {
  chart: Chart<'pie', number[], string> | null = null;
  private dataSubscription: Subscription | null = null;
  private readonly apiUrl = 'https://localhost:5001/api/dashboard/revenues/counterYearlyRevenues/2024'; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.dataSubscription = this.http.get<Revenue[]>(this.apiUrl).subscribe(
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

    const backgroundColors = [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)'
    ];

    const revenues = data.map(item => item.revenue);
    const labels = data.map(item => item.saleCounterName);

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

