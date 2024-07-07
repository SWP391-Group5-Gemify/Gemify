import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GenderEnum, GenderModel } from '../../../../core/models/gender.model';
import EnumUtils from '../../../utils/EnumUtils';
import { MatRadioModule } from '@angular/material/radio';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CustomerService } from '../../../../core/services/customer/customer.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NotificationService } from '../../../../core/services/notification/notification.service';

@UntilDestroy()
@Component({
  selector: 'app-checkout-customer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    CdkStepperModule,
  ],
  templateUrl: './checkout-customer.component.html',
  styleUrl: './checkout-customer.component.scss',
})
export class CheckoutCustomerComponent implements OnInit {
  // =========================
  // == Fields
  // =========================
  @Input() checkoutForm?: FormGroup;
  public genderOptions!: GenderModel[];

  // =========================
  // == Life cycle
  // =========================
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
}
