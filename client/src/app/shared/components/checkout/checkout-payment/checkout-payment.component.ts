import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from '../../../../core/services/basket/basket.service';
import { OrdersService } from '../../../../core/services/orders/orders.service';
import { CdkStepperModule } from '@angular/cdk/stepper';

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
    private orderService: OrdersService
  ) {}

  // =========================
  // == Methods
  // =========================

  createOrderOnBasketAndCustomer() {
    const basket_id = this.basketService.currentBasketId;
    const customer_id = this.checkoutForm?.get('customerForm')?.get('id');

    if (basket_id && customer_id) {
      this.orderService.createSaleOrder(basket_id, Number(customer_id));
    }
  }
}
