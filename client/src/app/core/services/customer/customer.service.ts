import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Customer,
  CustomerResponse,
} from '../../models/customer/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  // ====================
  // == Fields
  // ====================
  baseCustomerUrl: string = environment.baseApiUrl.concat('/customers');

  // ====================
  // == Life Cycle
  // ====================
  constructor(private http: HttpClient) {}

  // ====================
  // == Methods
  // ====================

  getCustomers(
    pageIndex: number,
    pageSize: number
  ): Observable<CustomerResponse> {
    let params = new HttpParams();
    params.append('pageIndex', pageIndex.toString());
    params.append('pageSize', pageSize.toString());

    return this.http.get<CustomerResponse>(this.baseCustomerUrl, {
      params: params,
    });
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseCustomerUrl}/${id}/`);
  }

  updateCustomerById(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(
      `${this.baseCustomerUrl}/${customer.id}/`,
      customer
    );
  }
}
