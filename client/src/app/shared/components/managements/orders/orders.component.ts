import { Component, OnInit } from "@angular/core";
import {
  Order,
  OrderParams,
  OrderType,
} from "../../../../core/models/order.model";
import { OrdersService } from "../../../../core/services/orders/orders.service";
import { MatTableDataSource } from "@angular/material/table";
import { PageEvent } from "@angular/material/paginator";
import { DropdownModel } from "../../../../core/models/dropdown.model";
import { StatsTotalRowsComponent } from "../../stats-total-rows/stats-total-rows.component";
import { GenericTableDataSourceComponent } from "../../generic-table-data-source/generic-table-data-source.component";
import { CommonModule } from "@angular/common";
import { GenericDropdownComponent } from "../../generic-dropdown/generic-dropdown.component";

@Component({
  selector: "app-orders",
  standalone: true,
  imports: [
    CommonModule,
    GenericTableDataSourceComponent,
    StatsTotalRowsComponent,
    GenericDropdownComponent,
  ],
  templateUrl: "./orders.component.html",
  styleUrl: "./orders.component.scss",
})
export class OrdersComponent implements OnInit {
  types: OrderType[] = [];
  orderParams = new OrderParams();

  columnsToDisplay = [
    "id",
    "orderDate",
    "name",
    "phone",
    "promotionCode",
    "promotionDiscount",
    "total",
    "orderType",
    "status",
  ];

  dataSource = new MatTableDataSource<Order>([]);
  typeDropdown!: DropdownModel[];
  totalOrders = 0;

  constructor(private ordersService: OrdersService) {
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
        this.typeDropdown = response.map((type: OrderType) => ({
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
    const orderTypeId = $event;
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
}
