import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { PaginationModel } from '../../models/pagination-model.model';
import {
  EmployeeModel,
  EmployeeRole,
  EmployeeStatus,
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
    const params = {
      pageIndex: pageIndex.toString(),
      pageSize: pageSize.toString(),
    };

    return this.http.get<PaginationModel<EmployeeModel>>(this.baseEmployeeUrl, {
      params: params,
    });
  }

  /**
   * Get employee By Id
   * @param id
   * @returns
   */
  getEmployeeById(id: number) {
    return this.http.get<EmployeeModel>(`${this.baseEmployeeUrl}/${id}`);
  }

  /**
   * Get roles of the employees
   * @returns
   */
  getEmployeeRoles() {
    return this.http.get<EmployeeRole>(`${this.baseEmployeeUrl}/roles`);
  }

  /**
   * Update a whole employee by passing json object
   * @param employee
   * @returns
   */
  updateEmployee(employee: EmployeeModel) {
    return this.http.put(`${this.baseEmployeeUrl}`, { data: employee });
  }

  /**
   * Disable Employee account
   * @param id
   */
  disableEmployee(id: number) {
    return this.http.delete(`${this.baseEmployeeUrl}/${id}`);
  }
}
