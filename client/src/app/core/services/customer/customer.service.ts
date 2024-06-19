import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { CustomerModel } from "../../models/customer.model";
import { PaginationModel } from "../../models/pagination.model";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  // ====================
  // == Fields
  // ====================
  baseCustomerUrl: string = environment.baseApiUrl.concat("/customers");

  // ====================
  // == Life Cycle
  // ====================
  constructor(private http: HttpClient) {}

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
    pageIndex: number,
    pageSize: number
  ): Observable<PaginationModel<CustomerModel>> {
    const params = {
      pageIndex: pageIndex.toString(),
      pageSize: pageSize.toString(),
    };

    return this.http.get<PaginationModel<CustomerModel>>(this.baseCustomerUrl, {
      params: params,
    });
  }

  /**
   * Get customers on Id
   * @param id id of the customer
   * @returns
   */
  getCustomerById(id: number): Observable<CustomerModel> {
    return this.http.get<CustomerModel>(`${this.baseCustomerUrl}/${id}/`);
  }

  /**
   * Update Customer based on Object
   * @param customer
   * @returns
   */
  updateCustomer(customer: CustomerModel): Observable<CustomerModel> {
    return this.http.put<CustomerModel>(`${this.baseCustomerUrl}`, customer);
  }
}
