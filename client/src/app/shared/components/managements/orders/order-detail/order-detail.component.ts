import { Component, OnInit } from '@angular/core';
import {
  OrderModel,
  OrderItemModel,
  OrderItemGemModel,
  OrderTypeEnum,
} from '../../../../../core/models/order.model';
import { OrderService } from '../../../../../core/services/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
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
import { lastValueFrom, map, tap } from 'rxjs';
import ImageUtils from '../../../../utils/ImageUtils';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GoldService } from '../../../../../core/services/gold/gold.service';
import { GoldModel } from '../../../../../core/models/gold.model';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { RoleEnum } from '../../../../../core/models/role.model';

@UntilDestroy()
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
  // ====================
  // == Fields
  // ====================
  public order?: OrderModel;
  public dataSource = new MatTableDataSource<OrderItemModel>([]);
  public expandedElement?: OrderItemModel | null;
  public basketIdAndPhoneDropdown!: DropdownModel[];

  columnsToDisplay = [
    'image_Url',
    'productName',
    'goldPrice',
    'goldTypeName',
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

  // ====================
  // == Lifecycle
  // ====================
  constructor(
    private ordersService: OrderService,
    private route: ActivatedRoute,
    private basketService: BasketService,
    private dialog: MatDialog,
    private location: Location,
    private goldService: GoldService,
    private notificationService: NotificationService,
    private authService: AuthService
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

  // ====================
  // == Methods
  // ====================

  /**
   * Check if the current user is the Cashier or not
   * @returns
   */
  isUserCashier() {
    return (
      this.authService.currentUser()?.role == RoleEnum.Cashier ||
      this.authService.currentUser()?.role == RoleEnum.Repurchaser
    );
  }

  /**
   * Go back to the previous page
   */
  onGoBackToOrders() {
    this.location.back();
  }

  /**
   * Expand rows
   * @param element
   */
  toggleRow(element: OrderItemModel) {
    element.orderItemGems && element.orderItemGems.length > 0
      ? (this.expandedElement =
          this.expandedElement === element ? null : element)
      : null;
  }

  /**
   * Loads the dropdown options for basket ID and phone number.
   * Maps baskets to dropdown model.
   */
  public loadBasketIdAndPhoneDropdown() {
    this.basketService.getBaskets().subscribe((baskets: BasketModel[]) => {
      this.basketIdAndPhoneDropdown = baskets.map((basket) => ({
        value: basket.id,
        name: this.basketService.generateTempTicketId(basket),
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
  public async onOpenModalAndCreateBuybackBasketWithCustomerPhone() {
    const dialogRef = this.dialog.open(ModalCreateNewBasketComponent, {
      width: '30rem',
      height: '30rem',
    });

    dialogRef
      .beforeClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result) {
          this.basketService.createEmptyBasketWithPhoneNumber(
            result.phoneNumber,
            OrderTypeEnum.BUYBACK
          );

          this.loadBasketIdAndPhoneDropdown();
        }
      });
  }

  /**
   * Create new modal, adding customer phone and create new basket
   */
  public onOpenModalAndCreateExchangeBasketWithCustomerPhone() {
    const dialogRef = this.dialog.open(ModalCreateNewBasketComponent, {
      width: '30rem',
      height: '30rem',
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result) {
          this.basketService.createEmptyBasketWithPhoneNumber(
            result.phoneNumber,
            OrderTypeEnum.EXCHANGE
          );

          this.loadBasketIdAndPhoneDropdown();
        }
      });
  }

  /**
   * Create new modal, add new gold weight after inspection
   */
  public onOpenModalAndChangeGoldWeight($event: any) {
    const orderItem = $event as OrderItemModel;

    const dialogRef = this.dialog.open(ModalChangeGoldWeightComponent, {
      width: '30rem',
      height: '30rem',
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result) {
          // Convert orderItem to buyback item, calculate the total basket price
          this.goldService
            .getGoldById(orderItem.goldTypeId)
            .pipe(
              tap((gold: GoldModel) => {
                this.basketService.addOrderItemToCurrentBuyBackBasket(
                  orderItem,
                  1,
                  Number.parseFloat(result.goldWeight),
                  gold.latestAskPrice
                );
              })
            )
            .subscribe({
              next: (value) => {
                this.notificationService.show(
                  `Bỏ sản phẩm ${orderItem?.productName} thành công.`
                );
              },
              error: (err) => {
                this.notificationService.show(
                  `Bỏ sản phẩm ${orderItem?.productName} thất bại.`
                );
              },
            });
        }
      });
  }

  /**
   * Add order item as an exchange product to the
   * @param $event
   */
  public addOrderItemToCartForExchangeFromParent($event: any) {
    const orderItem = $event as OrderItemModel;
    this.basketService.addOrderItemToCurrentExchangeBasket(orderItem, 1);
    this.notificationService.show(
      `Thêm sản phẩm ${orderItem.productName} vào giỏ hàng trao đổi thành công.`
    );
  }
}
