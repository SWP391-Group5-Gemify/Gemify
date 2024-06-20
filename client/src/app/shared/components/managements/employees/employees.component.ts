import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { GenericTableDataSourceComponent } from '../../generic-table-data-source/generic-table-data-source.component';
import { StatsTotalRowsComponent } from '../../stats-total-rows/stats-total-rows.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { EmployeeModel } from '../../../../core/models/employee.model';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { RoleModel } from '../../../../core/models/role.model';
import {
  ModalConfigModel,
  ModalModeEnum,
  ModalTitle,
} from '../../../../core/models/modal.model';
import { ModalEditCreateEmployeeComponent } from './modal-edit-create-employee/modal-edit-create-employee.component';
import { SnackbarService } from '../../../../core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    GenericTableDataSourceComponent,
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
      'actions',
    ],

    dataSource: new MatTableDataSource<EmployeeModel>(),
    pageIndex: 0, // Since the API is 1-based, but the table is 0-based
    pageSize: 5,
    totalEmployees: 0,
  };
  employeeRoles$!: Observable<RoleModel[]>;

  // ====================
  // == Life Cycle
  // ====================
  constructor(
    private employeeService: EmployeeService,
    private createOrEditModal: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadRoles();
  }

  // ====================
  // == Methods
  // ====================

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
   * Load employees from the server
   * @param roles
   */
  loadEmployees(role?: RoleModel): void {
    this.employeeService
      .getEmployees(
        this.tableConfig.pageIndex + 1,
        this.tableConfig.pageSize,
        role
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
   * Load all roles for the dropdown role's items
   */
  loadRoles(): void {
    this.employeeRoles$ = this.employeeService.getEmployeeRoles();
  }

  /**
   * Disable Employee's status
   * @param employee
   */
  disableEmployee(employee: EmployeeModel) {
    this.employeeService.disableEmployee(employee.id).subscribe({
      next: (response) => {
        this.loadEmployees();
      },
    });
  }

  /**
   * Open the Modal for Editing Employee's data
   * - When close, pass data from child back to parent
   * - When open, pass data from parent to child
   * @param employee
   */
  openEditEmployeeModal(employee: EmployeeModel) {
    const modalDataFromParent: ModalConfigModel = {
      title: ModalTitle.EditEmployeeTitle,
      mode: ModalModeEnum.Edit,
      initialData: {
        ...employee,
      },
    };

    const dialogRef = this.createOrEditModal.open(
      ModalEditCreateEmployeeComponent,
      {
        width: '80%',
        height: '80%',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
        disableClose: true,
        data: modalDataFromParent,
      }
    );

    // Subscribe to the EventEmitter for editing
    // - Calling the employee service for update
    dialogRef.componentInstance.editOrCreateEmployee.subscribe({
      next: (employee: EmployeeModel) => {
        this.employeeService.updateEmployee(employee).subscribe({
          next: (value) => {
            this.snackbarService.show('Employee updated successfully');
            this.loadEmployees();
          },
          error: (err) => {
            console.error(err);
            this.snackbarService.show('Error updating employee', 'Retry', 5000);
          },
        });
      },
    });
  }
}
