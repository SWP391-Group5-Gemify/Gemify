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
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { genderOptions } from '../../../core/models/user.model';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { EmployeeRoleModel } from '../../../core/models/employee.model';
import { Observable } from 'rxjs';
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
    MatRadioModule,
    MatDatepickerModule,
    MatButtonToggleModule,
  ],
  templateUrl: './form-edit-create-modal.component.html',
  styleUrl: './form-edit-create-modal.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class FormEditCreateModalComponent implements OnInit {
  // =========================
  // == Fields
  // =========================

  @Output() editDataFromChild = new EventEmitter<any>();
  public formEditOrCreate!: FormGroup;
  public inputData: any;
  public genderOptions: any;
  public roleOptions$!: Observable<EmployeeRoleModel[]>;

  // =========================
  // == Life cycle
  // =========================
  /**
   *
   * @param formBuilder
   * @param dataFromParent
   * @param ref
   */
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dataFromParent: any,
    private ref: MatDialogRef<FormEditCreateModalComponent>,
    private employeeService: EmployeeService
  ) {
    this.genderOptions = genderOptions;
    this.roleOptions$ = employeeService.getEmployeeRoles();
  }

  ngOnInit(): void {
    this.inputData = this.dataFromParent.initialData;

    this.formEditOrCreate = this.formBuilder.group({
      fullName: [this.inputData.fullName || '', Validators.required],
      email: [
        this.inputData.email || '',
        [Validators.required, Validators.email],
      ],
      password: [this.inputData.password || '', Validators.required],
      retypePassword: ['', Validators.required],
      phoneNumber: [this.inputData.phoneNumber || '', Validators.required],
      gender: [this.inputData.gender || 'Male', Validators.required],
      dateOfBirth: [this.inputData.dateOfBirth || '', Validators.required],
      address: [this.inputData.address || '', Validators.required],
      role: [this.inputData.role || '', Validators.required],
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
   * - Handle both edit and create
   */
  saveModal() {
    if (this.formEditOrCreate.valid) {
      const updatedData = {
        ...this.inputData,
        ...this.formEditOrCreate.value,
      };

      // Let the base class handle the event
      this.editDataFromChild.emit(updatedData);
      this.ref.close();
    }
  }
}
