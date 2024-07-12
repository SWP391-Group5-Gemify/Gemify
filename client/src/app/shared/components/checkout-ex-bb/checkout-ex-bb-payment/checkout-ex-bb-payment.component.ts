import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  loadStripe,
  Stripe,
  StripeCardCvcElement,
  StripeCardExpiryElement,
  StripeCardNumberElement,
} from '@stripe/stripe-js';
import { BasketService } from '../../../../core/services/basket/basket.service';
import { OrderService } from '../../../../core/services/order/order.service';
import { CustomerService } from '../../../../core/services/customer/customer.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { Router } from '@angular/router';
import { CustomerModel } from '../../../../core/models/customer.model';
import { Observable, of, switchMap } from 'rxjs';
import { untilDestroyed } from '@ngneat/until-destroy';
import { BasketModel } from '../../../../core/models/basket.model';

@Component({
  selector: 'app-checkout-ex-bb-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CdkStepperModule,
  ],
  templateUrl: './checkout-ex-bb-payment.component.html',
  styleUrl: './checkout-ex-bb-payment.component.scss',
})
export class CheckoutExBbPaymentComponent {
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
  cardNumberComplete: boolean = false;
  cardExpiryComplete: boolean = false;
  cardCvcComplete: boolean = false;
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

  /**
   * Mouting the Stripe element with DOM
   */
  private loadStripeElements() {
    loadStripe(
      'pk_test_51PUK1yH4cqSp4VXJHybYeJtdBWnrg7bvtFNjPQUzXhSBuwZmftIXBGku1rmVixTa9TGhkl9vJV21fzWehS8036o300f6ruad85'
    ).then((stripe) => {
      this.stripe = stripe;
      const elements = stripe?.elements();
      if (elements) {
        // Card Number
        this.cardNumber = elements.create('cardNumber');
        this.cardNumber.mount(this.cardNumberRef?.nativeElement);
        this.cardNumber.on('change', (event) => {
          this.cardNumberComplete = event.complete;
          if (event.error) this.cardNumberError = event.error.message;
          else this.cardNumberError = null;
        });

        // Card Expiry
        this.cardExpiry = elements.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryRef?.nativeElement);
        this.cardExpiry.on('change', (event) => {
          this.cardExpiryComplete = event.complete;
          if (event.error) this.cardExpiryError = event.error.message;
          else this.cardExpiryError = null;
        });

        // Card CVC
        this.cardCvc = elements.create('cardCvc');
        this.cardCvc.mount(this.cardCvcRef?.nativeElement);
        this.cardCvc.on('change', (event) => {
          this.cardCvcComplete = event.complete;
          if (event.error) this.cardCvcError = event.error.message;
          else this.cardCvcError = null;
        });
      }
    });
  }

  /**
   * Check whether or not the payment is complete
   */
  get isPaymentFromComplete() {
    return (
      this.checkoutForm?.get('paymentForm')?.valid &&
      this.cardNumberComplete &&
      this.cardCvcComplete &&
      this.cardExpiryComplete
    );
  }

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
   * Create order after having
   * - Payment Intent Id
   * - Basket Id
   * - Customer Id
   * - Membership Id
   */
  public submitOrder() {
    this.isLoading = true;

    // Basket Id
    let basket: BasketModel | null = this.basketService.getCurrentBasketValue();
    if (basket) {
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
                        if (result.paymentIntent) {
                          this.notificationService.show(
                            'Tạo hóa đơn thành công'
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
