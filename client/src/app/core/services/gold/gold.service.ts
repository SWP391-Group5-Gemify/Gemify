import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { GoldModel, LatestGoldPricesModel } from '../../models/gold.model';
import { map, Observable } from 'rxjs';
import { PaginationModel } from '../../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class GoldService {
  baseGoldChartUrl: string = environment.baseApiUrl.concat('/golds');

  constructor(private http: HttpClient) {}

  /**
   * Calling the api and get the latest gold price
   * @returns
   */
  getLatestGoldPrices(): Observable<LatestGoldPricesModel[]> {
    return this.http
      .get<LatestGoldPricesModel[]>(this.baseGoldChartUrl + '/latest')
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  /**
   * Get all gold
   * @returns
   */
  getAllGolds(): Observable<PaginationModel<GoldModel>> {
    return this.http.get<PaginationModel<GoldModel>>(this.baseGoldChartUrl);
  }
}
