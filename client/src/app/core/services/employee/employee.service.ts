import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { PaginationModel } from '../../models/pagination.model';
import { EmployeeModel } from '../../models/employee.model';
import { AuthService } from '../auth/auth.service';
import { RoleEnum, RoleModel } from '../../models/role.model';

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
  constructor(private http: HttpClient, private authService: AuthService) {}

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
    pageIndex: number = 1,
    pageSize: number = 5,
    role?: RoleModel
  ): Observable<PaginationModel<EmployeeModel>> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    // if having roles
    if (role) {
      params.set('roleId', role.id);
    }

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
   * Get total roles
   * @returns
   */
  getEmployeeRoles(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(`${this.baseEmployeeUrl}/roles`);
  }

  /**
   * Update a whole employee by passing json object
   * @param employee
   * @returns
   */
  updateEmployee(employee: EmployeeModel): Observable<any> {
    return this.http.put(this.baseEmployeeUrl, employee);
  }

  /**
   * Disable Employee account
   * @param id
   */
  disableEmployee(id: number): Observable<any> {
    const params = new HttpParams().set('id', Number(id));
    return this.http.delete(this.baseEmployeeUrl, { params });
  }

  /**
   * Register a new employee account
   * - Only StoreOwner can register an account for other employees
   */
  registerNewEmployee(employee: EmployeeModel): Observable<any> {
    return this.authService.registerNewUser(employee);
  }
}
