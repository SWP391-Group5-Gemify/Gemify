import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  CustomerCreateModel,
  CustomerModel,
} from '../../models/customer.model';
import { PaginationModel } from '../../models/pagination.model';
import { CreateUpdateDeleteResponseModel } from '../../models/response.model';

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
  constructor(private httpClient: HttpClient) {}

  // ====================
  // == Methods
  // ====================

  /**
   * Get customers on paging
   * @param pageIndex current page index
   * @param pageSize  no. of items on 1 page
   * @returns
   */
  getCustomers(
    pageIndex: number = 1,
    pageSize: number = 5
  ): Observable<PaginationModel<CustomerModel>> {
    const params = {
      pageIndex: pageIndex.toString(),
      pageSize: pageSize.toString(),
    };

    return this.httpClient.get<PaginationModel<CustomerModel>>(
      this.baseCustomerUrl,
      {
        params: params,
      }
    );
  }

  /**
   * Get customer on Id
   * @param id id of the customer
   * @returns
   */
  getCustomerById(id: number): Observable<CustomerModel> {
    return this.httpClient.get<CustomerModel>(`${this.baseCustomerUrl}/${id}/`);
  }

  /**
   * Get customer by Phone
   * TODO: Currently return false if the user not existed
   * @param phone
   * @returns
   */
  getCustomerByPhone(phone: number | string): Observable<CustomerModel> {
    return this.httpClient.get<CustomerModel>(
      `${this.baseCustomerUrl}/phone/${phone}`
    );
  }

  /**
   * Update Customer based on customer object
   * @param customer
   * @returns
   */
  updateCustomer(
    customer: CustomerModel
  ): Observable<CreateUpdateDeleteResponseModel> {
    return this.httpClient.put<CreateUpdateDeleteResponseModel>(
      `${this.baseCustomerUrl}`,
      customer
    );
  }

  /**
   *
   * @param customerCreateModel
   * @returns statusCode and message
   */
  createCustomer(customerCreateModel: CustomerCreateModel) {
    return this.httpClient.post<CreateUpdateDeleteResponseModel>(
      this.baseCustomerUrl,
      customerCreateModel
    );
  }
}
