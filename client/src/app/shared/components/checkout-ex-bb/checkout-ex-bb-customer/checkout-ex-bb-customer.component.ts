import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GenderEnum, GenderModel } from '../../../../core/models/gender.model';
import EnumUtils from '../../../utils/EnumUtils';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { BasketService } from '../../../../core/services/basket/basket.service';
import { OrderTypeEnum } from '../../../../core/models/order.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NotificationService } from '../../../../core/services/notification/notification.service';

@UntilDestroy()
@Component({
  selector: 'app-checkout-ex-bb-customer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    CdkStepperModule,
  ],
  templateUrl: './checkout-ex-bb-customer.component.html',
  styleUrl: './checkout-ex-bb-customer.component.scss',
})
export class CheckoutExBbCustomerComponent {
  // =========================
  // == Fields
  // =========================
  @Input() checkoutForm?: FormGroup;
  public OrderTypeEnum = OrderTypeEnum;
  public genderOptions!: GenderModel[];

  // =========================
  // == Life cycle
  // =========================
  constructor(
    public basketService: BasketService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadGenderRadioButtons();
  }

  // =========================
  // == Methods
  // =========================

  /**
   * Load gender radio buttons
   */
  loadGenderRadioButtons() {
    this.genderOptions = EnumUtils.enumToObject(GenderEnum);
  }

  /**
   * Create the payment intent with basket id
   */
  public createPaymentIntent() {
    this.basketService
      .createPaymentIntent(this.basketService.getCurrentBasketValue()?.id!)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.notificationService.show('Payment intent created');
        },
        error: (error) => this.notificationService.show(error.message),
      });
  }
}
