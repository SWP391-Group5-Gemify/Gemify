import { Component, OnInit } from '@angular/core';
import {
  OrderModel,
  OrderItemModel,
  OrderItemGemModel,
} from '../../../../../core/models/order.model';
import { OrderService } from '../../../../../core/services/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BasketService } from '../../../../../core/services/basket/basket.service';
import { MatDialog } from '@angular/material/dialog';
import { BasketModel } from '../../../../../core/models/basket.model';
import { ModalCreateNewBasketComponent } from '../../products/modal-create-new-basket/modal-create-new-basket.component';
import { DropdownModel } from '../../../../../core/models/dropdown.model';
import { GenericDropdownComponent } from '../../../generic-dropdown/generic-dropdown.component';
import { ModalChangeGoldWeightComponent } from './modal-change-gold-weight/modal-change-gold-weight.component';
import { ProductService } from '../../../../../core/services/product/product.service';
import { ProductModel } from './../../../../../core/models/product.model';
import { lastValueFrom, map } from 'rxjs';
import ImageUtils from '../../../../utils/ImageUtils';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    GenericDropdownComponent,
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent implements OnInit {
  order?: OrderModel;
  dataSource = new MatTableDataSource<OrderItemModel>([]);
  expandedElement?: OrderItemModel | null;
  public basketIdAndPhoneDropdown!: DropdownModel[];

  columnsToDisplay = [
    'image_Url',
    'productName',
    'goldPrice',
    'goldType',
    'goldWeight',
    'productLabour',
    'unit',
    'price',
    'quantity',
    'total',
    'add',
    'expand',
  ];

  columnsToDisplayWithExpand = [
    'gemName',
    'gemColor',
    'gemWeight',
    'gemCarat',
    'gemClarity',
    'gemCertificateCode',
    'price',
    'quantity',
    'total',
  ];

  constructor(
    private ordersService: OrderService,
    private route: ActivatedRoute,
    private basketService: BasketService,
    private dialog: MatDialog,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    id &&
      this.ordersService.getOrderById(id).subscribe({
        next: (order) => {
          this.order = order;
          this.dataSource.data = order.orderItems.map((orderItem) => {
            return {
              ...orderItem,
              image_Url: ImageUtils.concatLinkToTokenFirebase(
                orderItem.image_Url
              ),
            };
          });
          this.dataSource._updateChangeSubscription();
        },
        error: (error) => console.log(error),
      });
    this.loadBasketIdAndPhoneDropdown();
  }

  toggleRow(element: OrderItemModel) {
    element.orderItemGems && element.orderItemGems.length > 0
      ? (this.expandedElement =
          this.expandedElement === element ? null : element)
      : null;
  }

  /**
   * Loads the dropdown options for basket ID and phone number.
   * Maps baskets to dropdown model.
   * TODO: Handle error when load failed
   */
  public loadBasketIdAndPhoneDropdown() {
    this.basketService.getBaskets().subscribe((baskets: BasketModel[]) => {
      this.basketIdAndPhoneDropdown = baskets.map((basket) => ({
        value: basket.id,
        name: this.basketService.generateTempTicketId(
          basket.id,
          basket.phoneNumber
        ),
      }));
    });
  }

  /**
   * Handles selection change in basket ID and phone number dropdown.
   * Update the current basket source for adding new item into it.
   * @param event$ Event containing selected value.
   */
  public onSelectChangeBasketIdAndPhoneFromParent(event: any) {
    const selectedBasketId = event?.value;

    if (selectedBasketId) {
      this.basketService.loadBasketById(selectedBasketId);
    }
  }

  /**
   * Create new modal, adding customer phone and create new basket
   */
  public onOpenModalAndCreateBasketWithCustomerPhone() {
    const dialogRef = this.dialog.open(ModalCreateNewBasketComponent, {
      width: '80%',
      height: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.basketService.createEmptyBasketWithPhoneNumber(result.phoneNumber);
      }
    });
  }

  /**
   * Create new modal, add new gold weight after inspection
   */
  public onOpenModalAndChangeGoldWeight($event: any) {
    const dialogRef = this.dialog.open(ModalChangeGoldWeightComponent, {
      width: '80%',
      height: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addOrderItemToCartFromChild($event, result.goldWeight);
      }
    });
  }

  // Add order item to cart as buyback item
  private async addOrderItemToCartFromChild(
    orderItem: OrderItemModel,
    newGoldWeight: number
  ) {
    const price = await lastValueFrom(
      this.calculateBuybackProductsPrice(orderItem, newGoldWeight)
    );
    this.basketService.addBuybackItemToCurrentBasket(
      orderItem,
      price,
      newGoldWeight
    );
  }

  // Add order item to cart as exchange item
  public addOrderItemToCartFromChildForExchange($event: any) {
    const orderItem: OrderItemModel = $event;
    const price = this.calculateExchangeProductsPrice(orderItem);
    this.basketService.addExchangeItemToCurrentBasket(
      orderItem,
      price
    );
  }

  // Calculate buyback item price
  private calculateBuybackProductsPrice(
    orderItem: OrderItemModel,
    newGoldWeight: number
  ) {
    return this.productService.getProductById(orderItem.productItemId).pipe(
      map((product) => {
        const price = (
          product.latestAskPrice * newGoldWeight +
          this.calculateBuybackGemsPrice(orderItem.orderItemGems)
        );
        return price;
      })
    );
  }

  // Calculate gem prices of the buyback item
  private calculateBuybackGemsPrice(orderItemGems: OrderItemGemModel[]) {
    return orderItemGems.reduce(
      (acc, curr) => {
        let gemPrice = 0;
        if(curr.isProcurable) {
          gemPrice = curr.price * 0.7 * curr.quantity
        }
        return acc + gemPrice;
      },
      0
    );
  }

  // Calculate exchange item price
  private calculateExchangeProductsPrice(orderItem: OrderItemModel) {
    return orderItem.goldPrice * orderItem.goldWeight + orderItem.productLabour + 
    this.calculateExchangeGemsPrice(orderItem.orderItemGems);
  }

  // Calculate gem prices of the exchange item
  private calculateExchangeGemsPrice(orderItemGems: OrderItemGemModel[]) {
    return orderItemGems.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
  }
}
