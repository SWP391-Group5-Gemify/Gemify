import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationModel } from '../../models/pagination.model';
import {
  PromotionCreateModel,
  PromotionModel,
  PromotionParams,
} from '../../models/promotion.model';
import { environment } from '../../../../environments/environment';
import { CreateUpdateDeleteResponseModel } from '../../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  // ========================
  // == Fields
  // ========================
  private basePromotionUrl: string =
    environment.baseApiUrl.concat('/promotions');

  // ========================
  // == Constructors
  // ========================
  constructor(private httpClient: HttpClient) {}

  // ========================
  // == Methods
  // ========================

  /**
   * Get promotions with pagination
   * @param promotionsSearchingCriteria
   * @returns
   */
  public getPromotions(
    promotionParams: PromotionParams
  ): Observable<PaginationModel<PromotionModel>> {
    let params = new HttpParams()
      .set('pageIndex', promotionParams.pageIndex)
      .set('pageSize', promotionParams.pageSize);

    // if having searchName
    if (promotionParams.searchName) {
      params = params.set('search', promotionParams.searchName);
    }

    // if having status
    if (promotionParams.status) {
      params = params.set('status', promotionParams.status);
    }

    return this.httpClient.get<PaginationModel<PromotionModel>>(
      this.basePromotionUrl,
      { params: params }
    );
  }

  /**
   * Get Promotion by code
   */
  public getPromotionByCode(code: string): Observable<PromotionModel> {
    return this.httpClient.get<PromotionModel>(
      `${this.basePromotionUrl}/${code}`
    );
  }

  /**
   * Get a specific promotion by id
   * @param id
   * @returns
   */
  public getPromotionById(id: string | number): Observable<PromotionModel> {
    const discountsBaseUrl = this.basePromotionUrl.concat('/discounts');

    return this.httpClient.get<PromotionModel>(`${discountsBaseUrl}/${id}`);
  }

  /**
   * Create a new promotion
   * @param promotion
   * @returns
   */
  public createPromotion(
    promotion: PromotionCreateModel
  ): Observable<CreateUpdateDeleteResponseModel> {
    return this.httpClient.post<CreateUpdateDeleteResponseModel>(
      `${this.basePromotionUrl}`,
      promotion
    );
  }

  /**
   * Disable promotion status
   * @param id
   * @returns
   */
  public disablePromotion(
    id: number | string
  ): Observable<CreateUpdateDeleteResponseModel> {
    return this.httpClient.delete<CreateUpdateDeleteResponseModel>(
      `${this.basePromotionUrl}/${id}`
    );
  }
}
