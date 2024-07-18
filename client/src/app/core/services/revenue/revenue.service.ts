import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaleCounterRevenueModel } from '../../models/sale-counter.model';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  // ========================
  // == Fields
  // ========================
  private baseRevenueUrl: string =
    environment.baseApiUrl.concat('/saleCounters');

  // ========================
  // == Constructors
  // ========================
  constructor(private httpClient: HttpClient) {}

  // ========================
  // == Methods
  // ========================

  

  /**
   * Get Revenue by date
   */
  public getRevenueByDate(date: string): Observable<SaleCounterRevenueModel[]> {
    return this.httpClient.get<SaleCounterRevenueModel[]>(
      `${this.baseRevenueUrl}/bydate?revenueDate=${date}`
    );
  }

  /**
   * Add sale revenue in current date
   */
  public updateDailyRevenue() {
    return this.httpClient.post(`${this.baseRevenueUrl}/updates`, null);
  }
}
