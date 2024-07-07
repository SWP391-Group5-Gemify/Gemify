import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BasketService } from '../../../../core/services/basket/basket.service';
import { OrderService } from '../../../../core/services/order/order.service';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { PromotionService } from '../../../../core/services/promotion/promotion.service';
import { CustomerService } from '../../../../core/services/customer/customer.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { CustomerModel } from '../../../../core/models/customer.model';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { BasketModel } from '../../../../core/models/basket.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PromotionModel } from '../../../../core/models/promotion.model';
import {
  loadStripe,
  Stripe,
  StripeCardCvcElement,
  StripeCardExpiryElement,
  StripeCardNumberElement,
} from '@stripe/stripe-js';
import { CreateUpdateDeleteResponseModel } from '../../../../core/models/response.model';

@UntilDestroy()
@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CdkStepperModule,
  ],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss',
})
export class CheckoutPaymentComponent implements OnInit {
  // =========================
  // == Fields
  // =========================
  @Input() checkoutForm?: FormGroup;
  @ViewChild('cardNumber') cardNumberRef?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryRef?: ElementRef;
  @ViewChild('cardCvc') cardCvcRef?: ElementRef;
  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;
  cardNumberError: string | null = null;
  cardExpiryError: string | null = null;
  cardCvcError: string | null = null;
  isLoading: boolean = false;

  // =========================
  // == Life cycle
  // =========================
  constructor(
    private basketService: BasketService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStripeElements();
  }

  // =========================
  // == Methods
  // =========================

  private loadStripeElements() {
    loadStripe(
      'pk_test_51PUK1yH4cqSp4VXJHybYeJtdBWnrg7bvtFNjPQUzXhSBuwZmftIXBGku1rmVixTa9TGhkl9vJV21fzWehS8036o300f6ruad85'
    ).then((stripe) => {
      this.stripe = stripe;
      const elements = stripe?.elements();
      if (elements) {
        this.cardNumber = elements.create('cardNumber');
        this.cardNumber.mount(this.cardNumberRef?.nativeElement);
        this.cardNumber.on('change', (event) => {
          if (event.error) this.cardNumberError = event.error.message;
          else this.cardNumberError = null;
        });

        this.cardExpiry = elements.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryRef?.nativeElement);
        this.cardExpiry.on('change', (event) => {
          if (event.error) this.cardExpiryError = event.error.message;
          else this.cardExpiryError = null;
        });

        this.cardCvc = elements.create('cardCvc');
        this.cardCvc.mount(this.cardCvcRef?.nativeElement);
        this.cardCvc.on('change', (event) => {
          if (event.error) this.cardCvcError = event.error.message;
          else this.cardCvcError = null;
        });
      }
    });
  }

  // /**
  //  * Create a customer if not existed
  //  * TODO: BACKEND PLEASE MODIFY THE API FOR CHECKING EXISTING CUSTOMER
  //  */
  // private handleCustomerInfo(): Observable<CustomerModel> {
  //   const customerFormValue = this.checkoutForm?.get('customerForm')?.value;
  //   const phone = customerFormValue.phone;

  //   // If customer no exist, return phone
  //   if (!phone) {
  //     return of();
  //   }

  //   return this.customerService.getCustomerByPhone(phone).pipe(
  //     switchMap((existingCustomer) => {
  //       if (existingCustomer) {
  //         // If having customer, update the customer
  //         return this.customerService.updateCustomer({
  //           ...existingCustomer,
  //           ...customerFormValue,
  //         });
  //       } else {
  //         // If not, create new customer
  //         return this.customerService
  //           .createCustomer(customerFormValue)
  //           .pipe(
  //             switchMap((_) => this.customerService.getCustomerByPhone(phone))
  //           );
  //       }
  //     }),
  //     catchError((error: CreateUpdateDeleteResponseModel) => {
  //       if (error.statusCode === 404) {
  //         // If not, create new customer
  //         return this.customerService
  //           .createCustomer(customerFormValue)
  //           .pipe(
  //             switchMap((_) => this.customerService.getCustomerByPhone(phone))
  //           );
  //       } else {
  //         // Propagate other errors
  //         return throwError(error);
  //       }
  //     })
  //   );
  // }

  private createCustomerInfo(): Observable<CustomerModel> {
    return this.customerService
      .createCustomer(this.checkoutForm?.get('customerForm')?.value)
      .pipe(
        untilDestroyed(this),
        switchMap(() => {
          let phone = this.checkoutForm
            ?.get('customerForm')
            ?.get('phone')?.value;

          return this.customerService.getCustomerByPhone(phone);
        })
      );
  }

  /**
   * Create order after having
   * - Payment Intent Id
   * - Basket Id
   * - Customer Id
   * - TODO: Promotion Id (optional)
   */
  public submitOrder() {
    this.isLoading = true;

    // Basket Id
    let basket: BasketModel | null = this.basketService.getCurrentBasketValue();
    if (basket) {
      // Load customer, get customer's id
      this.createCustomerInfo()
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (customer: CustomerModel) => {
            if (customer.id && basket.id) {
              this.orderService
                .createSaleOrder(basket.id, customer.id)
                .subscribe({
                  next: (order) => {
                    // Confirm Card Payment from Stripe
                    this.stripe
                      ?.confirmCardPayment(basket.clientSecret!, {
                        payment_method: {
                          card: this.cardNumber!,
                          billing_details: {
                            name: this.checkoutForm
                              ?.get('paymentForm')
                              ?.get('nameOnCard')?.value,
                          },
                        },
                      })
                      .then((result) => {
                        console.log(result);
                        if (result.paymentIntent) {
                          this.notificationService.show(
                            'Tạo hóa đơn thành công'
                          );
                          this.basketService.deleteBasket(basket.id);
                          this.router.navigate(['cashier/orders']);
                        } else {
                          this.notificationService.show(result.error.message!);
                        }
                      });
                  },
                });
            }
          },
        });
    }
  }
}
