import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PaginationModel } from '../../models/pagination.model';
import { EmployeeModel } from '../../models/employee.model';
import { AuthService } from '../auth/auth.service';
import { RoleModel } from '../../models/role.model';
import { CreateUpdateDeleteResponseModel } from '../../models/response.model';
import ImageUtils from '../../../shared/utils/ImageUtils';

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
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

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
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    // if having roles
    if (role) {
      params = params.set('roleId', role.id);
    }

    return this.httpClient
      .get<PaginationModel<EmployeeModel>>(this.baseEmployeeUrl, {
        params: params,
      })
      .pipe(
        map((paginationModel) => {
          // Transform each product's imageUrl using ImageUtils.concatLinkToTokenFirebase
          paginationModel.data.forEach((employee) => {
            employee.image_Url = ImageUtils.concatLinkToTokenFirebase(
              employee.image_Url
            );
          });
          return paginationModel;
        })
      );
  }

  /**
   * Get employee By Id
   * @param id
   * @returns
   */
  getEmployeeById(id: number): Observable<EmployeeModel> {
    return this.httpClient.get<EmployeeModel>(`${this.baseEmployeeUrl}/${id}`);
  }

  /**
   * Get total roles
   * @returns
   */
  getEmployeeRoles(): Observable<RoleModel[]> {
    return this.httpClient.get<RoleModel[]>(`${this.baseEmployeeUrl}/roles`);
  }

  /**
   * Update a whole employee by passing json object
   * @param employee
   * @returns
   */
  updateEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
    return this.httpClient.put<EmployeeModel>(
      `${this.baseEmployeeUrl}/${employee.id}`,
      employee
    );
  }

  /**
   * Disable Employee account
   * @param id
   */
  disableEmployee(id: number): Observable<CreateUpdateDeleteResponseModel> {
    return this.httpClient.delete<CreateUpdateDeleteResponseModel>(
      `${this.baseEmployeeUrl}/${id}`
    );
  }

  /**
   * Register a new employee account
   * - Only StoreOwner can register an account for other employees
   */
  registerNewEmployee(
    employee: EmployeeModel
  ): Observable<CreateUpdateDeleteResponseModel> {
    return this.authService.registerNewUser(employee);
  }
}
