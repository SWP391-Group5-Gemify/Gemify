import { Component, Input, OnInit } from '@angular/core';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BasketService } from '../../../../core/services/basket/basket.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { CustomerModel } from '../../../../core/models/customer.model';
import { Observable, of, switchMap } from 'rxjs';
import { CustomerService } from '../../../../core/services/customer/customer.service';
import { OrderService } from '../../../../core/services/order/order.service';
import { BasketModel } from '../../../../core/models/basket.model';
import { OrderTypeEnum } from '../../../../core/models/order.model';

@UntilDestroy()
@Component({
  selector: 'app-checkout-ex-bb-money-back',
  standalone: true,
  imports: [CdkStepperModule, CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-ex-bb-money-back.component.html',
  styleUrl: './checkout-ex-bb-money-back.component.scss',
})
export class CheckoutExBbMoneyBackComponent implements OnInit {
  // =========================
  // == Fields
  // =========================
  @Input() checkoutForm?: FormGroup;

  // =========================
  // == Life cycle
  // =========================

  constructor(
    private basketService: BasketService,
    private notificationService: NotificationService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // =========================
  // == Methods
  // =========================

  /**
   * Create a customer if not existed
   */
  private handleCustomerInfo(): Observable<CustomerModel> {
    const customerFormValue = this.checkoutForm?.get('customerForm')?.value;

    console.table(customerFormValue);
    const phone = customerFormValue.phone;

    // If customer no exist, return phone
    if (!phone) {
      return of();
    }

    return this.customerService.getCustomerByPhone(phone).pipe(
      untilDestroyed(this),
      switchMap((existingCustomer) => {
        if (existingCustomer) {
          // If having customer, update the customer
          return this.customerService.updateCustomer({
            ...existingCustomer,
            ...customerFormValue,
          });
        } else {
          // If not, create new customer
          return this.customerService.createCustomer(customerFormValue);
        }
      })
    );
  }

  /**
   * Create Buyback Order or Exchange Order
   * - For Buy-Back (In, Out)
   * - For Exchange (Out, Negative Total)
   */

  public obSubmitMoneyBack() {
    // Basket Id
    let basket: BasketModel | null = this.basketService.getCurrentBasketValue();
    if (basket) {
      switch (basket.orderTypeId) {
        // BUY BACK
        case OrderTypeEnum.BUYBACK: {
          this.submitMoneyBackBuyBack(basket);
          return;
        }

        // EXCHANGE (sale > buyback)
        case OrderTypeEnum.EXCHANGE: {
          this.submitMoneyBackExchange(basket);
          return;
        }
      }
    }
  }

  /**
   * Function for handling Buyback
   * @param basket
   */
  private submitMoneyBackBuyBack(basket: BasketModel) {
    // Load customer, get customer's id
    this.handleCustomerInfo()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (customer: CustomerModel) => {
          // Create order
          if (customer.id && basket.id) {
            this.orderService
              .createBuybackOrder(basket.id, customer.id)
              .subscribe({
                next: (order) => {
                  this.notificationService.show(
                    'Tạo hóa đơn mua lại thành công'
                  );
                  this.basketService
                    .deleteBasket(basket.id)
                    .pipe(untilDestroyed(this))
                    .subscribe({
                      next: (response) => {
                        if (response) {
                          this.router.navigate(['cashier/orders']);
                        }
                      },
                    });
                },
              });
          }
        },
      });
  }

  /**
   * Function for handling transaction on exchange with Sale > Buyback
   * @param basket
   */
  private submitMoneyBackExchange(basket: BasketModel) {
    // Load customer, get customer's id
    this.handleCustomerInfo()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (customer: CustomerModel) => {
          // Create order
          if (customer.id && basket.id) {
            this.orderService
              .createExchangeOrder(basket.id, customer.id)
              .subscribe({
                next: (order) => {
                  this.notificationService.show(
                    'Tạo hóa đơn trao đổi thành công'
                  );
                  this.basketService
                    .deleteBasket(basket.id)
                    .pipe(untilDestroyed(this))
                    .subscribe({
                      next: (response) => {
                        if (response) {
                          this.router.navigate(['cashier/orders']);
                        }
                      },
                      error: (err) => {
                        this.notificationService.show(err.error.message);
                      },
                    });
                },
                error: (err) => {
                  this.notificationService.show(err.error.message);
                },
              });
          }
        },
      });
  }
}
