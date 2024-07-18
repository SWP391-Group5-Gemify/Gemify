import { Component, OnInit, ViewChild } from '@angular/core';
import { CounterService } from '../../../../core/services/counter/counter.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GenericDropdownComponent } from '../../generic-dropdown/generic-dropdown.component';
import { CommonModule, DatePipe } from '@angular/common';
import { GenericSearchComponent } from '../../generic-search/generic-search.component';
import { MatIcon } from '@angular/material/icon';
import { Observable, map } from 'rxjs';
import {
  AssignEmployeeIdModel,
  SaleCounterModel,
  SaleCounterParams,
  SaleCounterRevenueModel,
} from '../../../../core/models/sale-counter.model';
import { DropdownModel } from '../../../../core/models/dropdown.model';
import { CardSaleCounterComponent } from './card-sale-counter/card-sale-counter.component';
import { EmployeeModel } from '../../../../core/models/employee.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { RevenueService } from '../../../../core/services/revenue/revenue.service';

@UntilDestroy()
@Component({
  selector: 'app-counters',
  standalone: true,
  imports: [
    GenericDropdownComponent,
    CommonModule,
    GenericSearchComponent,
    MatIcon,
    CardSaleCounterComponent,
  ],
  templateUrl: './counters.component.html',
  styleUrl: './counters.component.scss',
})
export class CountersComponent implements OnInit {
  // ====================
  // == Fields
  // ====================

  public saleCounters$!: Observable<SaleCounterModel[]>;
  public saleCounterRevenue!: SaleCounterRevenueModel[];
  public saleCountersStatusDropdown!: DropdownModel[];

  public saleCounterParams: SaleCounterParams = {
    pageSize: 5,
    pageIndex: 0,
    status: true,
    searchName: undefined,
    revenueDate: undefined,
  };
  @ViewChild('saleCountersStatusDropdownRef')
  saleCountersStatusDropdownRef!: GenericDropdownComponent;
  @ViewChild('nameSearchInputRef') nameSearchInputRef!: GenericSearchComponent;

  // ====================
  // == Lifecycle
  // ====================
  constructor(
    private counterService: CounterService,
    private revenueService: RevenueService,
    private notificationService: NotificationService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadSaleCounters();
    this.getCurrentDateRevenue();
    this.loadSaleCountersStatusDropdown();
  }

  // ====================
  // == Methods
  // ====================

  /**
   * Load Sale Counter Dropdown
   */
  public loadSaleCountersStatusDropdown() {
    this.saleCountersStatusDropdown = [
      {
        name: 'Còn hoạt động',
        value: true,
      },
      {
        name: 'Không hoạt động',
        value: false,
      },
    ];
  }

  /**
   * Load all sale counters
   */
  public loadSaleCounters() {
    this.saleCounters$ = this.counterService.getCounters({
      ...this.saleCounterParams,
    });
  }

  /**
   * Select the Sort by Sale Counter Status
   * @param event
   */
  public onSelectChangeStatusFromParent(event: any) {
    this.saleCounterParams.status = event?.value;
    this.loadSaleCounters();
  }

  /**
   * Filter the counter by names
   * @param valueChanged
   */
  public onValueChangesNameFromParent(valueChanged: any) {
    this.saleCounterParams.searchName = valueChanged;
    this.loadSaleCounters();
  }

  /**
   * Reset all filters and load the default products
   */
  public onResetFilters() {
    this.saleCountersStatusDropdownRef.onClearSelection();
    this.nameSearchInputRef.onClearInputFilter();
    this.saleCounterParams.searchName = undefined;
    this.saleCounterParams.status = undefined;
    this.loadSaleCounters();
  }

  /**
   * Assign employeeId to the counter or unassign
   * @param assignObject
   */
  public onAssignEmployeeIdFromParent(assignObject: AssignEmployeeIdModel) {
    this.counterService
      .assignEmployeeIdToCounter(assignObject)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (saleCounter: SaleCounterModel) => {
          this.loadSaleCounters();

          // If appoint to the employee
          if (saleCounter.userId) {
            this.notificationService.show(
              `Đã chỉ định quầy ${saleCounter.name} cho nhân viên ${saleCounter.userName}`
            );
          } else {
            this.notificationService.show(
              `Hủy chỉ định cho quầy ${saleCounter.name}`
            );
          }
        },

        error: (error) => {
          this.notificationService.show(error.error.message);
        },
      });
  }

  /**
   * Update daily revenue of each counter
   */
  public onUpdateDailyRevenue() {
    this.revenueService.updateDailyRevenue().subscribe({
      next: response => this.notificationService.show("Cập nhật thành công"),
      error: error => this.notificationService.show(error.error.message)
    });
  }

  /**
   * Get current date revenue for all counters
   */
  private getCurrentDateRevenue() {
    const date = new Date();
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd')!.toString();
    
    this.revenueService.getRevenueByDate(formattedDate).subscribe({
      next: (response) => {        
        this.saleCounterRevenue = response;
      },
      error: error => this.notificationService.show(error.error.message)
    });
  }

  public getRevenueByCounterId(id: number) {
    var revenue = this.saleCounterRevenue.find(s => s.saleCounterId === id);
    return revenue?.revenue;
  }
}

