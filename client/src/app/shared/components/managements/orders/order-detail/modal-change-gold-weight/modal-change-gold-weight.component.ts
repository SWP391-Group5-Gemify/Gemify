import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-modal-change-gold-weight',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './modal-change-gold-weight.component.html',
  styleUrl: './modal-change-gold-weight.component.scss'
})
export class ModalChangeGoldWeightComponent {
  // ==========================================
  // == Fields
  // ==========================================
  goldForm!: FormGroup;

  // ==========================================
  // == Constructors
  // ==========================================
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalChangeGoldWeightComponent>
  ) {}

  ngOnInit(): void {
    this.goldForm = this.fb.group({
      goldWeight: ['', Validators.required]
    });
  }

  // ==========================================
  // == Methods
  // ==========================================
  getErrorMessage(controlName: string): string {
    const control = this.goldForm.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    } else if (control?.hasError('pattern')) {
      return 'Invalid gold weight';
    }
    return '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.goldForm.valid) {
      this.dialogRef.close(this.goldForm.value);
    }
  }
}