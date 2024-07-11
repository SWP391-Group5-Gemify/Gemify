import { Component, OnInit, ViewChild } from '@angular/core';
import { CounterService } from '../../../../core/services/counter/counter.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GenericDropdownComponent } from '../../generic-dropdown/generic-dropdown.component';
import { CommonModule } from '@angular/common';
import { GenericSearchComponent } from '../../generic-search/generic-search.component';
import { MatIcon } from '@angular/material/icon';
import { Observable } from 'rxjs';
import {
  AssignEmployeeIdModel,
  SaleCounterModel,
  SaleCounterParams,
} from '../../../../core/models/sale-counter.model';
import { DropdownModel } from '../../../../core/models/dropdown.model';
import { CardSaleCounterComponent } from './card-sale-counter/card-sale-counter.component';
import { EmployeeModel } from '../../../../core/models/employee.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadSaleCounters();
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

        error: (_) => {
          this.notificationService.show('Có lỗi xảy ra, vui lòng thử lại');
        },
      });
  }
}
