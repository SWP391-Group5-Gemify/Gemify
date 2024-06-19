import { Component, Inject, OnInit } from '@angular/core';
import { ModalEditCreateEmployeeComponent } from '../modal-edit-create-employee/modal-edit-create-employee.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { UserModel } from '../../../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ModalConfigModel } from '../../../../../core/models/modal.model';

@Component({
  selector: 'app-form-view-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonToggleModule,
  ],
  templateUrl: './form-view-modal.component.html',
  styleUrl: './form-view-modal.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class FormViewModalComponent implements OnInit {
  // =========================
  // == Fields
  // =========================
  public modalDataConfig!: ModalConfigModel;

  // =========================
  // == Life cycle
  // =========================
  constructor(
    private ref: MatDialogRef<ModalEditCreateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public dataFromParent: any
  ) {}
  ngOnInit(): void {
    this.modalDataConfig = this.dataFromParent;
  }
}
