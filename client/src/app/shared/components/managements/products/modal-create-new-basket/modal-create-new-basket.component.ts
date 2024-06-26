import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-modal-create-new-basket',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './modal-create-new-basket.component.html',
  styleUrl: './modal-create-new-basket.component.scss',
})
export class ModalCreateNewBasketComponent implements OnInit {
  // ==========================================
  // == Fields
  // ==========================================
  basketForm!: FormGroup;

  // ==========================================
  // == Constructors
  // ==========================================
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalCreateNewBasketComponent>
  ) {}

  ngOnInit(): void {
    this.basketForm = this.fb.group({
      // customerName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
    });
  }

  // ==========================================
  // == Methods
  // ==========================================
  getErrorMessage(controlName: string): string {
    const control = this.basketForm.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    } else if (control?.hasError('pattern')) {
      return 'Not a valid phone number';
    }
    return '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.basketForm.valid) {
      this.dialogRef.close(this.basketForm.value);
    }
  }
}
