import { Component, OnInit } from '@angular/core';
import { catchError, firstValueFrom, map, of } from 'rxjs';
import { CustomerModel } from '../../../../core/models/customer.model';
import { CustomerService } from '../../../../core/services/customer/customer.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { GenericTableDataSourceComponent } from '../../generic-table-data-source/generic-table-data-source.component';
import { StatsTotalRowsComponent } from '../../stats-total-rows/stats-total-rows.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-customers',
  standalone: true,
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  imports: [CommonModule, GenericTableDataSourceComponent, StatsTotalRowsComponent],
})
export class CustomersComponent implements OnInit {
  // ==========================================
  // == Fields for Table + Paging + Filters
  // ==========================================

  tableConfig = {
    columnsToDisplay: [
      'id',
      'name',
      'gender',
      'phone',
      'address',
      'point',
      'membershipRate',
    ],

    dataSource: new MatTableDataSource<CustomerModel>([]),
    pageIndex: 0, // Since the API is 1-based, but the table is 0-based
    pageSize: 5,
    totalCustomers: 0,
  };

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
    this.tableConfig.dataSource.filter = filterValue.trim();

    if (this.tableConfig.dataSource.paginator) {
      this.tableConfig.dataSource.paginator.firstPage();
      this.tableConfig.pageIndex = 0; // Reset to the first page (0-based)
    }
  }

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
        this.tableConfig.dataSource._updateChangeSubscription();
      });
  }
}
