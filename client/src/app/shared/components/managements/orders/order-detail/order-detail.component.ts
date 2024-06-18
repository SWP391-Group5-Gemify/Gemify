import { Component, OnInit } from "@angular/core";
import {
  Order,
  OrderItem,
  OrderItemGem,
} from "../../../../../core/models/order.model";
import { OrdersService } from "../../../../../core/services/orders/orders.service";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-order-detail",
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  animations: [
    trigger("detailExpand", [
      state("collapsed,void", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
  templateUrl: "./order-detail.component.html",
  styleUrl: "./order-detail.component.scss",
})
export class OrderDetailComponent implements OnInit {
  order?: Order;
  dataSource = new MatTableDataSource<OrderItem>([]);
  expandedElement?: OrderItem | null;

  columnsToDisplay = [
    "image_Url",
    "productName",
    "goldPrice",
    "goldType",
    "goldWeight",
    "productLabour",
    "unit",
    "price",
    "quantity",
    "total",
    "expand",
  ];

  columnsToDisplayWithExpand = [
    "gemName",
    "gemColor",
    "gemWeight",
    "gemCarat",
    "gemClarity",
    "gemCertificateCode",
    "price",
    "quantity",
    "total",
  ];

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    id &&
      this.ordersService.getOrderById(+id).subscribe({
        next: (order) => {
          this.order = order;
          this.dataSource.data = order.orderItems;
          this.dataSource._updateChangeSubscription();
        },
        error: (error) => console.log(error),
      });
  }

  toggleRow(element: OrderItem) {
    element.orderItemGems && element.orderItemGems.length > 0
      ? (this.expandedElement =
          this.expandedElement === element ? null : element)
      : null;
  }

  // Calculate the total price of the product
  // Product price = (gold weight * bid price) + labour + (gem price * quantity)
  calculateProductTotal(orderItem: OrderItem) {
    return (
      (orderItem.goldPrice * orderItem.goldWeight +
      orderItem.productLabour +
      this.calculateGemsTotal(orderItem.orderItemGems)) *
      orderItem.quantity
    );
  }

  // Calculate the total price of all of the gems on a product
  calculateGemsTotal(orderItemGems: OrderItemGem[]) {
    let total = 0;
    orderItemGems.forEach((gem) => {
      total = total + this.calculateGemTotal(gem);
    });
    return total;
  }

  // Calculate the total price of gem
  calculateGemTotal(orderItemGem: OrderItemGem) {
    return orderItemGem.price * orderItemGem.quantity;
  }
}
