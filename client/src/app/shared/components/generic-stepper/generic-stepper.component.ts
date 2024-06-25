import { Component, Input, OnInit } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic-stepper',
  standalone: true,
  imports: [
    CdkStepperModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    CommonModule,
  ],
  providers: [{ provide: CdkStepper, useExisting: GenericStepperComponent }],
  templateUrl: './generic-stepper.component.html',
  styleUrl: './generic-stepper.component.scss',
})
export class GenericStepperComponent extends CdkStepper implements OnInit {
  // ======================
  // == Fields
  // ======================
  @Input() linearModeSelected = true;

  // ======================
  // == Lifecycle
  // ======================

  ngOnInit(): void {
    this.linear = this.linearModeSelected;
  }

  // ======================
  // == Methods
  // ======================

  onClick(index: number) {
    this.selectedIndex = index;
  }
}
