import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LatestGoldPricesModel } from '../../models/latest-gold-prices.model';
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
  getLatestGoldPrices(): Observable<LatestGoldPricesModel[]> {
    return this.http
      .get<LatestGoldPricesModel[]>(this.baseGoldChartUrl + '/golds/latest')
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
