import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { revenuesData } from '../../models/revenuesData.model';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../auth/auth.service';

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
    return this.http.get<revenuesData[]>(`${this.baseDashboardUrl}/revenues/${year}`);
  }

  getCounterRevenuesData(year: number){
    return this.http.get<revenuesData[]>(`${this.baseDashboardUrl}/revenues/${year}`);
  }
}
