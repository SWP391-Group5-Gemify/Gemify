import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LatestGoldPrices } from '../../models/latest-gold-prices.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoldChartService {
  baseGoldChartUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Calling the api and get the latest gold price
   * @returns
   */
  getLatestGoldPrices(): Observable<LatestGoldPrices[]> {
    return this.http
      .get<LatestGoldPrices[]>(this.baseGoldChartUrl + '/golds/latest')
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
