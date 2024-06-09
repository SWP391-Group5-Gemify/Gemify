import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LatestGoldPrices } from './../../../core/models/latest-gold-prices.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoldChartService {
  baseUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getLatestGoldPrices(): Observable<LatestGoldPrices[]> {
    return this.http.get<LatestGoldPrices[]>(this.baseUrl + '/golds/latest').pipe(
      map(response => {
        return response;
      })
    )
  }
}
