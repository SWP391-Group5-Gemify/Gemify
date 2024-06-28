import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

@UntilDestroy()
@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [CdkStepperModule],
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
   * - Basket Id
   * - Customer Id
   * - TODO: Promotion Id (optional)
   */
  createOrder() {
    // Basket Id
    let basket: BasketModel | null = this.basketService.getCurrentBasketValue();

    // If don't have basket, then return
    if (basket) {
      basket.promotionId =
        this.checkoutForm?.get('promotionForm')?.value ?? null;
      this.createCustomerInfo()
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (customer: CustomerModel) => {
            if (customer.id && basket.id) {
              // console.log(customer.id, basket.id, basket.promotionId);
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
