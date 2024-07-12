import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  Currency,
  GoldModel,
  GoldPricesModel,
  GoldsSearchingCriteriaModel,
  LatestGoldPricesModel,
  UpdateGoldPricesModel,
  WorldGoldPrice,
} from '../../models/gold.model';
import { map, Observable } from 'rxjs';
import { PaginationModel } from '../../models/pagination.model';
import { CreateUpdateDeleteResponseModel } from '../../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class GoldService {
  baseGoldChartUrl: string = environment.baseApiUrl.concat('/golds');
  goldPriceApiUrl = environment.goldPriceApiUrl;
  currencyApi = environment.currencyApiUrl;

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
  getGoldById(id: number | string): Observable<GoldModel> {
    return this.httpClient.get<GoldModel>(`${this.baseGoldChartUrl}/${id}`);
  }

  /**
   * Update Gold price of the specific Gold Type Id
   * @param bidAskGoldPriceModel
   * @returns
   */
  updateBidAskGoldPrice(
    goldTypeId: number,
    bidAskGoldPriceModel: UpdateGoldPricesModel
  ): Observable<CreateUpdateDeleteResponseModel> {
    return this.httpClient.put<CreateUpdateDeleteResponseModel>(
      this.baseGoldChartUrl + `/${goldTypeId}`,
      bidAskGoldPriceModel
    );
  }

  /**
   * Get current gold price VND/ounce
   */
  getWorldGoldPrice(): Observable<WorldGoldPrice> {
    return this.httpClient.get<WorldGoldPrice>(this.goldPriceApiUrl);
  }

  /**
   * Get USD to VND currency
   */
  getCurrency(): Observable<Currency> {
    return this.httpClient.get<Currency>(this.currencyApi);
  }
}
