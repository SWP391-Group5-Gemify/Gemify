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
  baseUrl = environment.baseApiUrl;
  orderParams = new OrderParams();

  constructor(private http: HttpClient) {}

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

    return this.http.get<PaginationModel<OrderModel>>(
      this.baseUrl + '/orders',
      {
        params,
      }
    );
  }

  getOrderById(id: number) {
    return this.http.get<OrderModel>(this.baseUrl + '/orders/' + id);
  }

  getOrderTypes() {
    return this.http.get<OrderTypeModel[]>(this.baseUrl + '/orders/types');
  }

  getOrderParams() {
    return this.orderParams;
  }

  setOrderParams(params: OrderParams) {
    this.orderParams = params;
  }
}
