import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SaleCounterModel } from '../../models/sale-counter.model';
import { Observable } from 'rxjs';

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
  public getCounters(): Observable<SaleCounterModel[]> {
    // Make an HTTP GET request to fetch all sale counters
    return this.httpClient.get<SaleCounterModel[]>(this.baseSaleCounterUrl);
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
    // Make an HTTP DELETE request to delete the sale counter
    return this.httpClient.delete<void>(`${this.baseSaleCounterUrl}/${id}`);
  }
}
