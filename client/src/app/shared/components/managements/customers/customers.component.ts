import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { CustomerModel } from '../../../../core/models/customer.model';
import { CustomerService } from '../../../../core/services/customer/customer.service';
import { CommonModule } from '@angular/common';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableDatasourceComponent } from '../../table-datasource/table-datasource.component';
import { StatsTotalRowsComponent } from '../../stats-total-rows/stats-total-rows.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    CommonModule,
    TableDatasourceComponent,
    StatsTotalRowsComponent,
  ],
})
export class CustomersComponent implements OnInit {
  // ====================
  // == Fields for Table
  // ====================

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

    dataSource: new MatTableDataSource<CustomerModel>(),
    pageIndex: 0, // Since the API is 1-based, but the table is 1-based
    pageSize: 5,
    totalCustomers: 0,
  };

  // ====================
  // == Fields for Paging
  // ====================

  // ====================
  // == Life Cycle
  // ====================
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  // ====================
  // == Methods
  // ====================

  /**
   * Load Customers
   * - Map response with page field
   * - Return the Observable<Customer[]>
   */
  loadCustomers(): void {
    this.customerService
      .getCustomers(this.tableConfig.pageIndex + 1, this.tableConfig.pageSize) // convert to 1-based
      .pipe(
        map((response) => {
          this.tableConfig.pageIndex = response.pageIndex - 1; // convert to 0-based
          this.tableConfig.pageSize = response.pageSize;
          this.tableConfig.totalCustomers = response.count;
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
    this.loadCustomers();
  }

  /**
   * Filter on data source
   * @param event
   */
  onApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableConfig.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.tableConfig.dataSource.paginator) {
      this.tableConfig.dataSource.paginator.firstPage();
      this.tableConfig.pageIndex = 0; // Reset to the first page (0-based)
    }
  }

  // //FIXME: Edit Customer Information
  // editCustomer(customer: CustomerModel): void {
  //   this.customerService.updateCustomerById(customer).subscribe({
  //     next(value) {},
  //   });
  // }
}
