import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationModel } from '../../models/pagination.model';
import {
  PromotionCreateModel,
  PromotionModel,
  PromotionsSearchingCriteriaModel,
} from '../../models/promotion.model';
import { environment } from '../../../../environments/environment';
import { ProductModel } from '../../models/product.model';
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
    promotionsSearchingCriteria: PromotionsSearchingCriteriaModel
  ): Observable<PaginationModel<PromotionModel>> {
    let params = new HttpParams()
      .set('pageIndex', promotionsSearchingCriteria.pageIndex)
      .set('pageSize', promotionsSearchingCriteria.pageSize);

    // if having searchName
    if (promotionsSearchingCriteria.searchName) {
      params = params.set('search', promotionsSearchingCriteria.searchName);
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
    return this.httpClient.get<PromotionModel>(
      `${this.basePromotionUrl}/${id}`
    );
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
