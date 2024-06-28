import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GenderEnum, GenderModel } from '../../../../core/models/gender.model';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import EnumUtils from '../../../utils/EnumUtils';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-checkout-customer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
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
  loadGenderRadioButtons() {
    this.genderOptions = EnumUtils.enumToObject(GenderEnum);
  }
}
