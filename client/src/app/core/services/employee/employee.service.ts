import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationModel } from '../../models/pagination-model.model';
import {
  EmployeeModel,
  EmployeeRoleEnum,
  EmployeeStatusEnum,
} from '../../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // ====================
  // == Fields
  // ====================
  baseEmployeeUrl: string = environment.baseApiUrl.concat('/employees');

  // ====================
  // == Life Cycle
  // ====================
  constructor(private http: HttpClient) {}

  // ====================
  // == Methods
  // ====================

  /**
   * Get all employees
   * @param pageIndex
   * @param pageSize
   * @returns
   */
  getEmployees(
    pageIndex: number,
    pageSize: number
  ): Observable<PaginationModel<EmployeeModel>> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginationModel<EmployeeModel>>(this.baseEmployeeUrl, {
      params: params,
    });
  }

  /**
   * Get employee By Id
   * @param id
   * @returns
   */
  getEmployeeById(id: number): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${this.baseEmployeeUrl}/${id}`);
  }

  /**
   * Get roles of the employees
   * @returns
   */
  getEmployeeRoles(): Observable<EmployeeRoleEnum[]> {
    return this.http.get<EmployeeRoleEnum[]>(`${this.baseEmployeeUrl}/roles`);
  }

  /**
   * Update a whole employee by passing json object
   * @param employee
   * @returns
   */
  updateEmployee(employee: EmployeeModel): Observable<any> {
    return this.http.put(`${this.baseEmployeeUrl}`, { data: employee });
  }

  /**
   * Disable Employee account
   * @param id
   */
  disableEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseEmployeeUrl}/${id}`);
  }
}
