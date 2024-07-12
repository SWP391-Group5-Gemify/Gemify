import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { TableBasketItemsSummaryComponent } from '../checkout/table-basket-items-summary/table-basket-items-summary.component';
import { MatIconModule } from '@angular/material/icon';
import { GenericStepperComponent } from '../generic-stepper/generic-stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CheckoutPaymentComponent } from '../checkout/checkout-payment/checkout-payment.component';
import { CheckoutCustomerComponent } from '../checkout/checkout-customer/checkout-customer.component';
import { FormBuilder, Validators } from '@angular/forms';
import { BasketService } from '../../../core/services/basket/basket.service';
import { CustomerService } from '../../../core/services/customer/customer.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CheckoutExchangeCustomerComponent } from './checkout-exchange-customer/checkout-exchange-customer.component';
import { CheckoutExchangePaymentComponent } from './checkout-exchange-payment/checkout-exchange-payment.component';

@UntilDestroy()
@Component({
  selector: 'app-checkout-exchange',
  standalone: true,
  imports: [
    CommonModule,
    TableBasketItemsSummaryComponent,
    MatIconModule,
    GenericStepperComponent,
    CdkStepperModule,
    CheckoutExchangeCustomerComponent,
    CheckoutExchangePaymentComponent,
  ],
  templateUrl: './checkout-exchange.component.html',
  styleUrl: './checkout-exchange.component.scss',
})
export class CheckoutExchangeComponent {
  // ======================-
  // == Fields
  // ======================

  public checkoutForm = this.fb.group({
    customerForm: this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    }),

    paymentForm: this.fb.group({
      nameOnCard: ['', Validators.required],
    }),
  });

  // ======================
  // == Lifecycle
  // ======================
  constructor(
    public basketService: BasketService,
    private location: Location,
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadCustomerOnBasketIfExist();
    this.basketService.calculateBasketExchangeTotalPrice();
  }

  // ======================
  // == Methods
  // ======================

  /**
   * Load Customer form if exist using phone
   */
  public loadCustomerOnBasketIfExist(): void {
    let phoneNumber =
      this.basketService.getCurrentBasketValue()?.phoneNumber ?? '';

    this.patchCustomerPhoneToCheckout(phoneNumber);

    // If customer is already existed, then set membershipId
    phoneNumber &&
      this.customerService
        .getCustomerByPhone(phoneNumber)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (customer) => {
            if (customer) {
              this.checkoutForm.get('customerForm')?.patchValue(customer);
            }
          },
        });
  }

  /**
   * Patch temporary phone into the customer checkout form
   */
  private patchCustomerPhoneToCheckout(phone: string = '') {
    this.checkoutForm.get('customerForm')?.get('phone')?.patchValue(phone);
  }

  /**
   * Go back to the baskets page
   */
  public onGoBackToBasketsPage() {
    this.location.back();
    this.checkoutForm.reset(this.checkoutForm.value);
  }
}
