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
  public basketForm!: FormGroup;

  // ==========================================
  // == Lifecycle
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

  /**
   * Prevent use input "ENTER" key for exiting
   * @param event
   */
  preventEnterKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  /**
   * Generate an error message based on the validation status of a specific form control.
   * @param controlName The name of the form control to get the error message for
   * @returns A string containing the appropriate error message
   */
  getErrorMessage(controlName: string): string {
    const control = this.basketForm.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    } else if (control?.hasError('pattern')) {
      return 'Not a valid phone number';
    }
    return '';
  }

  /**
   * Close the dialog without submitting any data.
   * This method is used to cancel or close the form dialog without making changes.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Handle form submission. If the form is valid, close the dialog and pass the form data.
   * This method is used to submit the form data and close the dialog with the submitted data.
   */
  onSubmit(): void {
    if (this.basketForm.valid) {
      this.dialogRef.close(this.basketForm.value);
    }
  }
}
