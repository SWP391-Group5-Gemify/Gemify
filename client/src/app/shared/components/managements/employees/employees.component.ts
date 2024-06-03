import { Component, OnInit } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableDatasourceComponent } from '../../table-datasource/table-datasource.component';
import { StatsTotalRowsComponent } from '../../stats-total-rows/stats-total-rows.component';
import { EmployeeModel } from '../../../../core/models/employee.model';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  tableConfig = {
    columnsToDisplay: [
      'id',
      'name',
      'gender',
      'phone',
      'address',
      'point',
      'membershipId',
      'membershipRate',
    ],

    dataSource: new MatTableDataSource<EmployeeModel>(),
    pageIndex: 0, // Since the API is 1-based, but the table is 1-based
    pageSize: 5,
    totalEmployees: 0,
  };
}
