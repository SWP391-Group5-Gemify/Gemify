import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  AssignEmployeeIdModel,
  SaleCounterModel,
  SaleCounterParams,
  SaleCounterRevenueModel,
} from '../../models/sale-counter.model';
import { Observable } from 'rxjs';
import { PaginationModel } from '../../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  // ========================
  // == Fields
  // ========================
  private baseSaleCounterUrl: string =
    environment.baseApiUrl.concat('/saleCounters');

  // ========================
  // == Constructors
  // ========================
  constructor(private httpClient: HttpClient) {}

  // ========================
  // == Methods
  // ========================
  /**
   * Fetches the sale counter data by ID.
   * @param id - The ID of the sale counter to fetch.
   * @returns An Observable of the SaleCounter data.
   */
  public getSaleCounterById(id: string | number): Observable<SaleCounterModel> {
    return this.httpClient.get<SaleCounterModel>(
      `${this.baseSaleCounterUrl}/${id}`
    );
  }

  /**
   * Fetches all sale counter data.
   * @returns An Observable of an array of SaleCounter data.
   */
  public getCounters(
    saleCounterParams: SaleCounterParams
  ): Observable<SaleCounterModel[]> {
    let params = new HttpParams();

    // If having search name
    if (saleCounterParams.searchName) {
      params = params.set('search', saleCounterParams.searchName);
    }

    // If having status
    if (
      saleCounterParams.status === true ||
      saleCounterParams.status === false
    ) {
      params = params.set('status', saleCounterParams.status);
    }

    // Make an HTTP GET request to fetch all sale counters
    return this.httpClient.get<SaleCounterModel[]>(this.baseSaleCounterUrl, {
      params: params,
    });
  }

  /**
   * Assigns a userId to the sale counter with the given ID.
   * @param counterId - The ID of the sale counter to update.
   * @param userId - The ID of the user to assign to the sale counter.
   * @returns An Observable of the updated SaleCounterModel data.
   */
  public assignEmployeeIdToCounter(
    assignObject: AssignEmployeeIdModel
  ): Observable<SaleCounterModel> {
    const assignUrl = this.baseSaleCounterUrl.concat('/assign');

    return this.httpClient.patch<SaleCounterModel>(
      `${assignUrl}/${assignObject.id}`,
      { userId: assignObject.employeeId }
    );
  }

  /**
   * Disable a sale counter by its ID.
   * @param id - The ID of the sale counter to delete.
   * @returns An Observable indicating the success of the deletion.
   */
  public disableSaleCounter(id: string | number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseSaleCounterUrl}/${id}`);
  }

  /**
   * Fetches sale counters revenue data by a specific date.
   * @param saleCounterParams - The parameters for filtering the revenue data.
   * @returns An Observable of SaleCounterRevenueModel containing revenue information.
   */
  public getSaleCountersRevenueByDate(
    saleCounterParams: SaleCounterParams
  ): Observable<SaleCounterRevenueModel> {
    const byDateUrl = this.baseSaleCounterUrl.concat('/bydate');

    let params = new HttpParams();

    // If having revenueDate
    if (saleCounterParams.revenueDate) {
      // const formattedDate = this.datePipe.transform(
      //   saleCounterParams.revenueDate,
      //   'yyyy-MM-dd'
      // );

      params = params.set(
        'revenueDate',
        saleCounterParams.revenueDate.toString()
      );
    }

    // Return the HTTP GET observable
    return this.httpClient.get<SaleCounterRevenueModel>(byDateUrl, { params });
  }

  /**
   * Get the revenue of 1 sale counter by id
   * @param id
   * @param saleCounterParams
   * @returns
   */
  public getSaleCounterRevenueById(
    id: number | string,
    saleCounterParams: SaleCounterParams
  ): Observable<PaginationModel<SaleCounterRevenueModel>> {
    let params = new HttpParams();

    // If having both pageIndex and pageSize
    if (saleCounterParams.pageIndex && saleCounterParams.pageSize) {
      params = params.set('pageIndex', saleCounterParams.pageIndex);
      params = params.set('pageSize', saleCounterParams.pageSize);
    }

    return this.httpClient.get<PaginationModel<SaleCounterRevenueModel>>(
      `${this.baseSaleCounterUrl}/${id}/revenues`,
      { params: params }
    );
  }
}
