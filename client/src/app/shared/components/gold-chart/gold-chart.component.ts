import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { LatestGoldPrices } from '../../../core/models/latest-gold-prices.model';
import { GoldChartService } from './gold-chart.service';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-gold-chart',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './gold-chart.component.html',
  styleUrl: './gold-chart.component.scss',
})

export class GoldChartComponent implements OnInit, OnDestroy{
  prices: LatestGoldPrices[] = [];
  displayedColumns: string[] = ['name', 'latestBidPrice', 'latestAskPrice', 'content'];
  currentDate: Date = new Date();
  subscription: Subscription | undefined;
  

  constructor(private goldChartService: GoldChartService) {}

  ngOnInit(): void {
    this.getLatestGoldPrices();
    this.loadTradingViewWidget();
    this.subscription = interval(60000).subscribe(() => {
      this.updateDateTime();
    })
  }

  // Configuring the global gold price chart
  loadTradingViewWidget() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.async = true;
    script.innerHTML = `
    {
      "symbols": [
        [
          "TVC:GOLD|3M"
        ]
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "colorTheme": "dark",
      "autosize": true,
      "showVolume": false,
      "showMA": false,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "hideSymbolLogo": false,
      "scalePosition": "right",
      "scaleMode": "Normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      "fontSize": "10",
      "noTimeScale": false,
      "valuesTracking": "1",
      "changeMode": "price-and-percent",
      "chartType": "area",
      "maLineColor": "#2962FF",
      "maLineWidth": 1,
      "maLength": 9,
      "lineWidth": 2,
      "lineType": 0,
      "dateRanges": [
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M"
      ]
    }`;
    document.getElementById('tradingview-widget')?.appendChild(script);
  }

  // Get all Latest Prices of each gold type
  getLatestGoldPrices() {
    this.goldChartService.getLatestGoldPrices().subscribe({
      next: response => {
        this.prices = response
      },
      error: error => console.log(error)
    }) 
  }

  // Update current date time
  updateDateTime() {
    this.currentDate = new Date();
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
