import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-edit-create-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-edit-create-modal.component.html',
  styleUrl: './form-edit-create-modal.component.scss',
})
export class FormEditCreateModalComponent implements OnInit {
  // =========================
  // == Fields
  // =========================

  @Output() editDataFromChild = new EventEmitter<any>();
  formEditOrCreate!: FormGroup;
  inputData: any;

  // =========================
  // == Life cycle
  // =========================
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dataFromParent: any,
    private ref: MatDialogRef<FormEditCreateModalComponent>
  ) {}

  ngOnInit(): void {
    this.inputData = this.dataFromParent.initialData;

    this.formEditOrCreate = this.formBuilder.group({
      fullName: this.formBuilder.control(
        this.inputData.fullName || '',
        Validators.required
      ),
      email: this.formBuilder.control(this.inputData.email || '', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  // =========================
  // == Methods
  // =========================
  /**
   * Close the modal
   * - Pass the edited data back to the parent
   */
  closeModal() {
    this.ref.close();
  }

  /**
   * Save the updated data
   * - Emit data to the parent component for service handling
   */
  saveModal() {
    if (this.formEditOrCreate.valid) {
      const updatedData = {
        ...this.inputData,
        ...this.formEditOrCreate.value,
      };

      this.editDataFromChild.emit(updatedData);
    }
  }
}
