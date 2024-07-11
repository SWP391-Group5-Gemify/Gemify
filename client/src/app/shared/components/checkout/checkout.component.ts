import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { BasketService } from '../../../core/services/basket/basket.service';
import { CommonModule, Location } from '@angular/common';
import { BasketItemModel } from '../../../core/models/basket.model';
import { TableBasketItemsSummaryComponent } from './table-basket-items-summary/table-basket-items-summary.component';
import { MatIconModule } from '@angular/material/icon';
import { GenericStepperComponent } from '../generic-stepper/generic-stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutCustomerComponent } from './checkout-customer/checkout-customer.component';
import { FormBuilder, Validators } from '@angular/forms';
import { CheckoutPromotionComponent } from './checkout-promotion/checkout-promotion.component';
import { CustomerService } from '../../../core/services/customer/customer.service';
import { GenderEnum } from '../../../core/models/gender.model';
import { catchError, Observable, Subscription } from 'rxjs';
import { CustomerModel } from '../../../core/models/customer.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OrderService } from '../../../core/services/order/order.service';
import { isFakeTouchstartFromScreenReader } from '@angular/cdk/a11y';
import { PromotionService } from '../../../core/services/promotion/promotion.service';
import { PromotionModel } from '../../../core/models/promotion.model';

@UntilDestroy()
@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  imports: [
    CommonModule,
    TableBasketItemsSummaryComponent,
    MatIconModule,
    GenericStepperComponent,
    CdkStepperModule,
    CheckoutPaymentComponent,
    CheckoutCustomerComponent,
    CheckoutPromotionComponent,
  ],
})
export class CheckoutComponent implements OnInit {
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

    promotionForm: this.fb.group({
      promotion: ['', Validators.required],
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
    private customerService: CustomerService,
    private promotionService: PromotionService
  ) {}

  ngOnInit(): void {
    this.loadCustomerOnBasketIfExist();
    this.loadPromotionOnBasketIfExist();
    this.basketService.calculateTotalBasketPrice();
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

            // if null, set default membershipId = 1, else set membersShipId from the existing customer
            this.basketService.setMembershipId(customer);
          },
        });
  }

  /**
   * Load the promotion on the basket if exist to set the initial price
   */
  public loadPromotionOnBasketIfExist(): void {
    let promotionId = this.basketService.getCurrentBasketValue()?.promotionId;

    // If don't have promotionId, then set the discount = 0, else get the discount and set to the signal total price
    if (!promotionId) {
      this.basketService.basketTotalPrice.update((value) => ({
        ...value,
        promotionDiscount: 0,
      }));
    } else {
      promotionId &&
        this.promotionService
          .getPromotionById(promotionId)
          .pipe(untilDestroyed(this))
          .subscribe({
            next: (promotion) => {
              if (promotion) {
                this.basketService.setPromotionId(promotion);
              }
            },
          });
    }
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
