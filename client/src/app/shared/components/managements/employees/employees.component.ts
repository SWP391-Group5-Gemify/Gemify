import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { TableDataSourceComponent } from '../../table-data-source/table-data-source.component';
import { StatsTotalRowsComponent } from '../../stats-total-rows/stats-total-rows.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  EmployeeModel,
  EmployeeStatusEnum,
  EmployeeRoleEnum,
  EmployeeRoleModel,
} from '../../../../core/models/employee.model';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    TableDataSourceComponent,
    StatsTotalRowsComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  // ==========================================
  // == Fields for Table + Paging + Filters
  // ==========================================
  tableConfig = {
    columnsToDisplay: [
      'id',
      'fullName',
      'email',
      'userName',
      'gender',
      'phoneNumber',
      'dateOfBirth',
      'status',
      'image_Url',
      'address',
      'role',
    ],

    dataSource: new MatTableDataSource<EmployeeModel>(),
    pageIndex: 0, // Since the API is 1-based, but the table is 0-based
    pageSize: 5,
    totalEmployees: 0,
  };
  employeeRoles$!: Observable<EmployeeRoleModel[]>;

  // ====================
  // == Life Cycle
  // ====================
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadRoles();
  }

  // ====================
  // == Methods
  // ====================
  loadEmployees(roles?: EmployeeRoleEnum): void {
    this.employeeService
      .getEmployees(
        this.tableConfig.pageIndex + 1,
        this.tableConfig.pageSize,
        roles
      )
      .pipe(
        map((response: any) => {
          this.tableConfig.pageIndex = response.pageIndex - 1;
          this.tableConfig.pageSize = response.pageSize;
          this.tableConfig.totalEmployees = response.count;
          return response.data;
        }),

        catchError((error) => {
          console.error('Error comes from: ', error);
          return of([]);
        })
      )
      .subscribe((data) => {
        this.tableConfig.dataSource.data = data;
      });
  }

  /**
   * Trigger event when the page is pagination
   * @param event
   */
  onPageEvent(event: PageEvent) {
    this.tableConfig.pageIndex = event.pageIndex; // Still 0-based
    this.tableConfig.pageSize = event.pageSize;
    this.loadEmployees();
  }

  /**
   * Filter on data source
   * @param event
   */
  onApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableConfig.dataSource.filter = filterValue.trim();

    if (this.tableConfig.dataSource.paginator) {
      this.tableConfig.dataSource.paginator.firstPage();
      this.tableConfig.pageIndex = 0; // Reset to the first page (0-based)
    }
  }

  /**
   * Load all roles for the dropdown role's items
   */
  loadRoles(): void {
    this.employeeRoles$ = this.employeeService.getEmployeeRoles();
  }
}
