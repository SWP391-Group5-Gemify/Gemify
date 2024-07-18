import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {
  RevenuesDataModel,
  RevenueSaleCounterModel,
  Revenue,
} from '../../../core/models/counter-revenue.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  // ====================
  // == Fields
  // ====================
  baseDashboardUrl: string = environment.baseApiUrl.concat('/dashboard');

  // ====================
  // == Life Cycle
  // ====================
  constructor(private http: HttpClient) {}

  // ====================
  // == Methods
  // ====================
  getRevenuesData(year: number) {
    return this.http.get<RevenuesDataModel[]>(
      `${this.baseDashboardUrl}/monthlyRevenues/${year}`
    );
  }

  getSpecificCounterYearlyRevenuesData(
    year: number
  ): Observable<Revenue[]> {
    return this.http.get<Revenue[]>(
      `${this.baseDashboardUrl}/revenues/counterYearlyRevenues/${year}`
    );
  }

  getSpecificCounterRevenuesInMonthData(
    year: number,
    month: number
  ): Observable<RevenueSaleCounterModel[]> {
    return this.http.get<RevenueSaleCounterModel[]>(
      `${this.baseDashboardUrl}/revenues/counters/${month}/${year}`
    );
  }
}
