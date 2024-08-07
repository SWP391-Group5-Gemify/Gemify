import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
    MatDialogModule,
  ],
  templateUrl: './modal-change-gold-weight.component.html',
  styleUrl: './modal-change-gold-weight.component.scss',
})
export class ModalChangeGoldWeightComponent {
  // ==========================================
  // == Fields
  // ==========================================
  goldForm!: FormGroup;

  // ==========================================
  // == Lifecycle
  // ==========================================

  ngOnInit(): void {
    this.goldForm = this.fb.group({
      goldWeight: [
        '',
        [Validators.required, Validators.pattern('^\\d+.\\d*$')],
      ],
    });
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalChangeGoldWeightComponent>
  ) {}

  // ==========================================
  // == Methods
  // ==========================================

  preventEnterKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.goldForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Bạn phải nhập trường này';
    } else if (control?.hasError('pattern')) {
      return 'Trọng lượng vàng không hợp lệ';
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
