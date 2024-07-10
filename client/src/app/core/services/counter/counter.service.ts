import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  SaleCounterModel,
  SaleCounterParams,
  SaleCounterRevenueModel,
} from '../../models/sale-counter.model';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

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
  constructor(private httpClient: HttpClient, private datePipe: DatePipe) {}

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
    if (saleCounterParams.status) {
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
    userId: string | number,
    counterId: string | number
  ): Observable<SaleCounterModel> {
    const assignUrl = this.baseSaleCounterUrl.concat('/assign');

    return this.httpClient.patch<SaleCounterModel>(
      `${assignUrl}/${counterId}`,
      { userId: userId }
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
      const formattedDate = this.datePipe.transform(
        saleCounterParams.revenueDate,
        'yyyy-MM-dd'
      );

      if (formattedDate) {
        params = params.set('revenueDate', formattedDate);
      }
    }

    // Return the HTTP GET observable
    return this.httpClient.get<SaleCounterRevenueModel>(byDateUrl, { params });
  }
}
