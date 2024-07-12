import { Component, Input, OnInit } from '@angular/core';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BasketService } from '../../../../core/services/basket/basket.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { CustomerModel } from '../../../../core/models/customer.model';
import { Observable, of, switchMap } from 'rxjs';
import { CustomerService } from '../../../../core/services/customer/customer.service';

@UntilDestroy()
@Component({
  selector: 'app-checkout-ex-bb-money-back',
  standalone: true,
  imports: [CdkStepperModule, CommonModule],
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

  public obSubmitMoneyBack() {}
}
