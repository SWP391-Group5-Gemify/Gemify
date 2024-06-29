import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BasketService } from '../../../../core/services/basket/basket.service';
import { OrderService } from '../../../../core/services/order/order.service';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { PromotionService } from '../../../../core/services/promotion/promotion.service';
import { CustomerService } from '../../../../core/services/customer/customer.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, switchMap } from 'rxjs';
import { CustomerModel } from '../../../../core/models/customer.model';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { BasketModel } from '../../../../core/models/basket.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
export class CheckoutPaymentComponent {
  // =========================
  // == Fields
  // =========================
  @Input() checkoutForm?: FormGroup;

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

  // =========================
  // == Methods
  // =========================

  /**
   * Create the Stripe payment intent for the basket
   */
  public createPaymentIntent() {
    this.basketService.createPaymentIntent().subscribe({
      next: () => {
        this.notificationService.show('Payment intent created');
      },
      error: (error) => this.notificationService.show(error.message),
    });
  }

  /**
   * Create a customer if not existed
   */
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
  public createOrder() {
    // Payment Intent
    this.createPaymentIntent();

    // Basket Id
    let basket: BasketModel | null = this.basketService.getCurrentBasketValue();
    if (basket) {
      // Attach promotion id if having
      basket.promotionId =
        this.checkoutForm?.get('promotionForm')?.get('promotionId')?.value ??
        null;

      // Load customer, get customer's id
      this.createCustomerInfo()
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (customer: CustomerModel) => {
            if (customer.id && basket.id) {
              console.log(customer.id, basket.id, basket.promotionId);
              console.table(basket);
              this.orderService
                .createSaleOrder(basket.id, customer.id)
                .subscribe({
                  next: (value) => {
                    this.notificationService.show('Tạo hóa đơn thành công');
                    this.basketService.deleteCurrentBasket();
                    this.router.navigate(['cashier/orders']);
                  },
                });
            }
          },
        });
    }
  }
}
