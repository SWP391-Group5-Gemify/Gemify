import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Observable, catchError, map, of } from 'rxjs';
import { CustomerModel } from '../../../../core/models/customer.model';
import { CustomerService } from '../../../../core/services/customer/customer.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [MatPaginatorModule, CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  // ====================
  // == Fields
  // ====================

  customers$: Observable<CustomerModel[]> | undefined;
  pageIndex: number = 1;
  pageSize: number = 5;
  totalCustomers: number = 0;

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
    this.customers$ = this.customerService
      .getCustomers(this.pageIndex, this.pageSize)
      .pipe(
        map((response) => {
          this.pageIndex = response.pageIndex;
          this.pageSize = response.pageSize;
          this.totalCustomers = response.count;
          return response.data;
        }),

        catchError((error) => {
          console.error('Error comes from: ', error);
          return of([]);
        })
      );
  }

  editCustomer(customer: CustomerModel): void {
    this.customerService.updateCustomerById(customer).subscribe({
      next(value) {},
    });
  }
}
