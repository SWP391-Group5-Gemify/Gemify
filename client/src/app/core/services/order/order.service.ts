import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  OrderModel,
  OrderParams,
  OrderTypeModel,
} from '../../models/order.model';
import { map, Observable } from 'rxjs';
import { PaginationModel } from '../../models/pagination.model';
import ImageUtils from '../../../shared/utils/ImageUtils';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // =============================================
  // == Fields
  // =============================================
  baseOrderUrl = environment.baseApiUrl.concat('/orders');
  orderParams = new OrderParams();

  // =============================================
  // == Lifecycle
  // =============================================
  constructor(private http: HttpClient) {}

  // =============================================
  // == Methods
  // =============================================
  /**
   * Get orders by Parans
   * @returns
   */
  getOrders(): Observable<PaginationModel<OrderModel>> {
    let params = new HttpParams();

    if (this.orderParams.orderTypeId > 0) {
      params = params.append('orderTypeId', this.orderParams.orderTypeId);
    }

    params = params.append('pageIndex', this.orderParams.pageIndex);
    params = params.append('pageSize', this.orderParams.pageSize);

    if (this.orderParams.search) {
      params = params.append('search', this.orderParams.search);
    }

    if (this.orderParams.startDate) {
      params = params.append('startDate', this.orderParams.startDate);
    }

    if (this.orderParams.endDate) {
      params = params.append('endDate', this.orderParams.endDate);
    }

    if (this.orderParams.status) {
      params = params.append('status', this.orderParams.status);
    }

    return this.http.get<PaginationModel<OrderModel>>(this.baseOrderUrl, {
      params,
    });
  }

  getOrderById(id: number | string) {
    return this.http.get<OrderModel>(`${this.baseOrderUrl}/${id}`);
  }

  getOrderTypes(): Observable<OrderTypeModel[]> {
    return this.http.get<OrderTypeModel[]>(`${this.baseOrderUrl}/types`);
  }

  getOrderParams() {
    return this.orderParams;
  }

  setOrderParams(params: OrderParams) {
    this.orderParams = params;
  }

  updateOrder(order: OrderModel) {
    let params = new HttpParams();

    if (order.status) {
      params = params.set('status', order.status);
    }
    return this.http.put<OrderModel[]>(
      `${this.baseOrderUrl}/update/${order.id}`,
      { params: params }
    );
  }

  // =============================================
  // == Create Sales, Buyback, Exchange orders
  // =============================================

  /**
   * Create Sale Order
   * @param basketId
   * @param customerId
   * @returns
   */
  createSaleOrder(basketId: number | string, customerId: number | string) {
    return this.http.post<{
      basketId: number | String;
      customerId: number | string;
    }>(`${this.baseOrderUrl}/sales`, {
      basketId: basketId,
      customerId: customerId,
    });
  }

  /**
   * Create Buyback Order
   * @param basketId
   * @param customerId
   * @returns
   */
  createBuybackOrder(basketId: number | string, customerId: number | string) {
    return this.http.post<{
      basketId: number | String;
      customerId: number | string;
    }>(`${this.baseOrderUrl}/buyback`, {
      basketId: basketId,
      customerId: customerId,
    });
  }

  /**
   * Create Exchange Order
   * @param basketId
   * @param customerId
   * @returns
   */
  createExchangeOrder(basketId: number | string, customerId: number | string) {
    return this.http.post<{
      basketId: number | String;
      customerId: number | string;
    }>(`${this.baseOrderUrl}/exchange`, {
      basketId: basketId,
      customerId: customerId,
    });
  }
}
