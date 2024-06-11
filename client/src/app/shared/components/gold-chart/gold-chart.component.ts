import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { LatestGoldPrices } from '../../../core/models/latest-gold-prices.model';
import { GoldChartService } from '../../../core/services/gold-chart/gold-chart.service';
import { CommonModule } from '@angular/common';
import { interval, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-gold-chart',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './gold-chart.component.html',
  styleUrl: './gold-chart.component.scss',
})
export class GoldChartComponent implements OnInit {
  // ======================================
  // == Fields
  // ======================================
  prices: LatestGoldPrices[] = [];
  displayedColumns: string[] = [
    'name',
    'latestBidPrice',
    'latestAskPrice',
    'content',
  ];
  currentDate$!: Observable<Date>;

  // ======================================
  // == Life Cycle
  // ======================================
  constructor(private goldChartService: GoldChartService) {
    this.currentDate$ = interval(60).pipe(
      startWith(0), // Emit the initial value
      map(() => new Date())
    );
  }

  ngOnInit(): void {
    this.getLatestGoldPrices();
    this.loadTradingViewWidget();
  }

  // ======================================
  // == Methods
  // ======================================
  // Configuring the global gold price chart
  loadTradingViewWidget() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.async = true;
    script.innerHTML = `
    {
      "symbols": [
        [
          "TVC:GOLD|4M"
        ]
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "colorTheme": "light",
      "autosize": true,
      "showVolume": false,
      "showMA": true,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "hideSymbolLogo": true,
      "scalePosition": "left",
      "scaleMode": "Normal",
      "fontFamily": "Roboto, BlinkMacSystemFont, sans-serif",
      "fontSize": "10",
      "noTimeScale": false,
      "valuesTracking": "1",
      "changeMode": "price-and-percent",
      "chartType": "area",
      "maLineColor": "#3D3F40",
      "maLineWidth": 2,
      "maLength": 9,
      "lineWidth": 2,
      "lineType": 0,
      "dateRanges": [
        "1m|30",
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M"
      ]
    }`;
    document
      .getElementById('id-gold-chart-tradingview-widget')
      ?.appendChild(script);
  }

  /**
   * Get the latest gold prices when calling api
   */
  getLatestGoldPrices() {
    this.goldChartService.getLatestGoldPrices().subscribe({
      next: (response) => {
        this.prices = response;
        console.table(this.prices);
      },
      error: (error) => console.log(error),
    });
  }
}
