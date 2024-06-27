import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { LatestGoldPricesModel } from '../../../core/models/gold.model';
import { GoldService } from '../../../core/services/gold/gold.service';
import { CommonModule } from '@angular/common';
import { interval, map, Observable, startWith } from 'rxjs';
import { VietNameseDatePipe } from '../../pipes/vietnameses-date-pipe/vietnamese-date.pipe';

@Component({
  selector: 'app-gold-chart',
  standalone: true,
  imports: [CommonModule, MatTableModule, VietNameseDatePipe],
  templateUrl: './gold-chart.component.html',
  styleUrl: './gold-chart.component.scss',
})
export class GoldChartComponent implements OnInit {
  // ======================================
  // == Fields
  // ======================================
  prices: LatestGoldPricesModel[] = [];
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
  constructor(private goldService: GoldService) {
    this.currentDate$ = interval(1000).pipe(
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
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = `
    {
      "autosize": true,
      "symbol": "TVC:GOLD*FX_IDC:USDVND",
      "interval": "D",
      "timezone": "Asia/Ho_Chi_Minh",
      "theme": "light",
      "style": "1",
      "locale": "vi_VN",
      "allow_symbol_change": false,
      "calendar": false,
      "withdateranges": true,
      "details": true,
      "support_host": "https://www.tradingview.com"
    }`;
    document
      .getElementById('id-gold-chart-tradingview-widget')
      ?.appendChild(script);
  }

  /**
   * Get the latest gold prices when calling api
   */
  getLatestGoldPrices() {
    this.goldService.getLatestGoldPrices().subscribe({
      next: (response) => {
        this.prices = response;
      },
      error: (error) => console.log(error),
    });
  }
}
