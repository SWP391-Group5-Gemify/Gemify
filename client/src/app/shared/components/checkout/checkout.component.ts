import { Component, OnDestroy, OnInit } from '@angular/core';
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
      promotionId: ['', Validators.required],
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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadCustomerOnFormIfExist();
  }

  // ======================
  // == Methods
  // ======================

  /**
   * Load Customer form if exist using phone
   */
  public loadCustomerOnFormIfExist(): void {
    console.log(
      'IN THE CHECKOUT: ',
      this.basketService.getCurrentBasketValue()
    );

    // this.basketService.basketSource$
    //   .subscribe({
    //     next: (currentBasket) => {
    //       if (currentBasket?.phoneNumber) {
    //         this.customerService
    //           .getCustomerByPhone(currentBasket?.phoneNumber)
    //           .subscribe({
    //             next: (existedCustomer) => {
    //               existedCustomer &&
    //                 this.checkoutForm
    //                   .get('customerForm')
    //                   ?.patchValue(existedCustomer);
    //             },
    //           });
    //       }
    //     },
    //   })
    //   .unsubscribe();
  }

  /**
   * Total Price of the Basket
   * @param items
   * @returns
   */
  public calculateBasketTotalPrice(items: BasketItemModel[]): number {
    return items.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  }

  /**
   * Go back to the baskets page
   */
  public onGoBackToBasketsPage() {
    this.location.back();
    this.checkoutForm.reset(this.checkoutForm.value);
  }
}
