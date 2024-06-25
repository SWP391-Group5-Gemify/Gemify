import { Component, OnInit } from '@angular/core';
import {
  OrderModel,
  OrderParams,
  OrderTypeModel,
} from '../../../../core/models/order.model';
import { OrdersService } from '../../../../core/services/orders/orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { DropdownModel } from '../../../../core/models/dropdown.model';
import { StatsTotalRowsComponent } from '../../stats-total-rows/stats-total-rows.component';
import { GenericTableDataSourceComponent } from '../../generic-table-data-source/generic-table-data-source.component';
import { CommonModule } from '@angular/common';
import { GenericDropdownComponent } from '../../generic-dropdown/generic-dropdown.component';
import { Router } from '@angular/router';
import { BasketService } from '../../../../core/services/basket/basket.service';
import { BasketModel } from '../../../../core/models/basket.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateNewBasketComponent } from '../products/modal-create-new-basket/modal-create-new-basket.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    GenericTableDataSourceComponent,
    StatsTotalRowsComponent,
    GenericDropdownComponent,
    MatIconModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  // ====================
  // == Fields
  // ====================
  types: OrderTypeModel[] = [];
  orderParams = new OrderParams();

  columnsToDisplay = [
    'id',
    'orderDate',
    'name',
    'phone',
    'total',
    'orderType',
    'status',
  ];

  dataSource = new MatTableDataSource<OrderModel>([]);
  typeDropdown!: DropdownModel[];
  totalOrders = 0;

  constructor(private ordersService: OrdersService, private router: Router) {
    this.orderParams = ordersService.getOrderParams();
  }

  // ====================
  // == Life Cycle
  // ====================
  ngOnInit(): void {
    this.loadOrders();
    this.loadOrderTypes();
  }

  // ====================
  // == Methods
  // ====================

  /**
   * Load Orders
   * - Map response with page field
   * - Return the Observable<Order[]>
   */
  loadOrders() {
    this.ordersService.getOrders().subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        this.dataSource._updateChangeSubscription();
        this.totalOrders = response.count;
      },
      error: (error) => console.log(error),
    });
  }

  /**
   * Load OrderTypes
   * - Map response with page field
   * - Return the Observable<OrderType[]>
   */
  loadOrderTypes() {
    this.ordersService.getOrderTypes().subscribe({
      next: (response) => {
        this.typeDropdown = response.map((type: OrderTypeModel) => ({
          value: type.id,
          name: type.name,
        }));
      },
      error: (error) => console.log(error),
    });
  }

  /**
   * Trigger event when the page is paginated
   * @param event
   */
  onPageEvent(event: PageEvent) {
    const params = this.ordersService.getOrderParams();
    params.pageSize = event.pageSize;
    if (params.pageIndex !== event.pageIndex + 1) {
      params.pageIndex = event.pageIndex + 1;
      this.ordersService.setOrderParams(params);
      this.orderParams = params;
    }
    this.loadOrders();
  }

  /**
   * Filter with Order Type ID
   * @param typeId
   */
  onTypeSelect(typeId: number) {
    const params = this.ordersService.getOrderParams();
    params.orderTypeId = typeId;
    params.pageIndex = 1;

    this.orderParams = params;
    this.ordersService.setOrderParams(params);
    this.loadOrders();
  }

  /**
   * Filter with keyword
   * @param event
   */
  onApplyFilter(event: Event) {
    const params = this.ordersService.getOrderParams();
    const filterValue = (event.target as HTMLInputElement).value;

    params.search = filterValue;
    params.pageIndex = 1;
    this.ordersService.setOrderParams(params);
    this.loadOrders();
  }

  /**
   * Select Order Type Id from the dropdown
   * @param $event
   */
  onSelectChangeOrderTypeIdFromParent($event: any) {
    const orderTypeId = $event.value;
    this.orderParams.orderTypeId = orderTypeId;
    this.loadOrders();
  }

  /**
   * Reset all params
   */
  onReset() {
    this.orderParams = new OrderParams();
    this.ordersService.setOrderParams(this.orderParams);
    this.loadOrders();
  }

  /**
   * Get id from table row and navigate to detail page
   * @param $event
   */
  onGetId($event: any) {
    const orderId = $event;
    this.router.navigate([this.router.url + '/' + orderId]);
  }
}
