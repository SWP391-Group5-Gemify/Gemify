import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { revenuesData } from '../../models/revenuesData.model';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { MonthlyRevenue, SaleCounterRevenue} from '../../../core/models/counter-revenue.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // ====================
  // == Fields
  // ====================
  baseDashboardUrl: string = environment.baseApiUrl.concat('/dashboard');

  // ====================
  // == Life Cycle
  // ====================
  constructor(private http: HttpClient, private authService: AuthService) {}

  getRevenuesData(year: number){
    return this.http.get<revenuesData[]>(`${this.baseDashboardUrl}/monthlyRevenues/${year}`);
  }

  getCounterRevenuesData(year: number){
    return this.http.get<revenuesData[]>(`${this.baseDashboardUrl}/monthlyRevenues/${year}`);
  }

  getSpecificCounterRevenuesData(year: number): Observable<MonthlyRevenue[]> {
    return this.http.get<MonthlyRevenue[]>(`${this.baseDashboardUrl}/revenues/counters/${year}`);
  }

  getSpecificCounterYearlyRevenuesData(year: number): Observable<MonthlyRevenue[]> {
    return this.http.get<MonthlyRevenue[]>(`${this.baseDashboardUrl}/revenues/counterYearlyRevenues/${year}`);
  }

  getSpecificCounterRevenuesInMonthData(year: number, month: number): Observable<SaleCounterRevenue[]> {
    return this.http.get<SaleCounterRevenue[]>(`${this.baseDashboardUrl}/revenues/counters/${month}/${year}`);
  }
}
