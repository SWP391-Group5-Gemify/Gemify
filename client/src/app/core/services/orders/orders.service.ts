import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  OrderModel,
  OrderParams,
  OrderTypeModel,
} from '../../models/order.model';
import { Observable } from 'rxjs';
import { PaginationModel } from '../../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
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

    return this.http.get<PaginationModel<OrderModel>>(this.baseOrderUrl, {
      params,
    });
  }

  getOrderById(id: number) {
    return this.http.get<OrderModel>(`${this.baseOrderUrl}/${id}`);
  }

  getOrderTypes() {
    return this.http.get<OrderTypeModel[]>(`${this.baseOrderUrl}/sales`);
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

  createSaleOrder(basketId: number | string, customerId: number | string) {
    return this.http.post<{
      basketId: number | String;
      customerId: number | string;
    }>(`${this.baseOrderUrl}/sales`, {
      basketId: basketId,
      customerId: customerId,
    });
  }

  createBuybackOrder(basketId: number | string, customerId: number | string) {
    return this.http.post<{
      basketId: number | String;
      customerId: number | string;
    }>(`${this.baseOrderUrl}/buyback`, {
      basketId: basketId,
      customerId: customerId,
    });
  }

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
