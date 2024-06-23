import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  GoldModel,
  GoldPricesModel,
  GoldsSearchingCriteriaModel,
  LatestGoldPricesModel,
  UpdateGoldPricesModel,
} from '../../models/gold.model';
import { map, Observable } from 'rxjs';
import { PaginationModel } from '../../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class GoldService {
  baseGoldChartUrl: string = environment.baseApiUrl.concat('/golds');

  constructor(private httpClient: HttpClient) {}

  /**
   * Calling the api and get the latest gold price
   * @returns
   */
  getLatestGoldPrices(): Observable<LatestGoldPricesModel[]> {
    return this.httpClient
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
    return this.httpClient.get<PaginationModel<GoldModel>>(
      this.baseGoldChartUrl
    );
  }

  /**
   * Get Gold Types by Id
   * @param id
   * @returns
   */
  getGoldById(id: number | string) {
    return this.httpClient.get<GoldModel>(`${this.baseGoldChartUrl}/${id}`);
  }

  /**
   * Get Gold Prices based on Gold Id
   * @param goldTypeId
   * @param goldsSearchingCriteria
   * @returns
   */
  getGoldPricesOnGoldTypeId(
    goldTypeId: number | string,
    goldsSearchingCriteria: GoldsSearchingCriteriaModel
  ): Observable<PaginationModel<GoldPricesModel>> {
    let params = new HttpParams()
      .set('pageIndex', goldsSearchingCriteria.pageIndex)
      .set('pageSize', goldsSearchingCriteria.pageSize);

    // Assign params if exists
    if (goldsSearchingCriteria.dateTime) {
      params = params.set(
        'dateTime',
        goldsSearchingCriteria.dateTime.toString()
      );
    }

    return this.httpClient.get<PaginationModel<GoldPricesModel>>(
      `${this.baseGoldChartUrl}/prices?goldTypeId=${goldTypeId}`,
      { params: params }
    );
  }

  /**
   * Update Gold price of the specific Gold Type Id
   * @param bidAskGoldPriceModel
   * @returns
   */
  updateBidAskGoldPrice(bidAskGoldPriceModel: UpdateGoldPricesModel) {
    return this.httpClient.put<UpdateGoldPricesModel>(
      this.baseGoldChartUrl,
      bidAskGoldPriceModel
    );
  }
}
