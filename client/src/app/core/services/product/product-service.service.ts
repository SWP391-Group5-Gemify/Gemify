import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(httpClient: HttpClient) {}

  getProducts(
    pageIndex: number,
    pageSize: number,
    search?: string,
    sort?: string
  ): any {}
}
