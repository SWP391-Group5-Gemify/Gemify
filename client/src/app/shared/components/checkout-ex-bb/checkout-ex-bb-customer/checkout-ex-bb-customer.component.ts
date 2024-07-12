import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GenderEnum, GenderModel } from '../../../../core/models/gender.model';
import EnumUtils from '../../../utils/EnumUtils';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { CdkStepperModule } from '@angular/cdk/stepper';

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
  styleUrl: './checkout-ex-bb-customer.component.scss'
})
export class CheckoutExBbCustomerComponent {
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
