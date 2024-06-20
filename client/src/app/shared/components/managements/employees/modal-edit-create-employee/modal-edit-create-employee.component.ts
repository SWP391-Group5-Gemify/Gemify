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
import { CommonModule, DatePipe } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Observable } from 'rxjs';
import {
  GenderModel,
  GenderEnum,
} from '../../../../../core/models/gender.model';
import {
  ModalConfigModel,
  ModalModeEnum,
} from '../../../../../core/models/modal.model';
import { RoleModel } from '../../../../../core/models/role.model';
import { EmployeeService } from '../../../../../core/services/employee/employee.service';
import EnumUtils from '../../../../utils/EnumUtils';
import { EmployeeModel } from '../../../../../core/models/employee.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-modal-edit-create-employee',
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
    MatIcon,
  ],
  templateUrl: './modal-edit-create-employee.component.html',
  styleUrl: './modal-edit-create-employee.component.scss',
  providers: [provideNativeDateAdapter(), DatePipe],
})
export class ModalEditCreateEmployeeComponent implements OnInit {
  // =========================
  // == Fields
  // =========================

  @Output() editOrCreateEmployee = new EventEmitter<any>();
  public formEditOrCreate!: FormGroup;
  public genderOptions!: GenderModel[];
  public roleOptions!: RoleModel[];
  public employee!: EmployeeModel;

  // =========================
  // == Life cycle
  // =========================
  /**
   * Constructor
   * @param formBuilder
   * @param dataFromParent
   * @param ref
   */
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public modalConfigFromParent: ModalConfigModel,
    private ref: MatDialogRef<ModalEditCreateEmployeeComponent>,
    private employeeService: EmployeeService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.employee = this.modalConfigFromParent.initialData;

    switch (this.modalConfigFromParent.mode) {
      case ModalModeEnum.Edit: {
        this.loadFormIfEdit();
        this.genderOptions = EnumUtils.enumToObject(GenderEnum);
        break;
      }
      case ModalModeEnum.Create: {
        this.loadRoles();
        this.genderOptions = EnumUtils.enumToObject(GenderEnum);
        break;
      }
    }
  }

  // =========================
  // == Methods
  // =========================

  /**
   * Load all roles within the database
   */
  loadRoles() {
    this.employeeService.getEmployeeRoles().subscribe({
      next: (response: RoleModel[]) => {
        this.roleOptions = response;
      },
    });
  }

  /**
   * Set initial values for forms if in EDIT mode
   */
  loadFormIfEdit() {
    this.formEditOrCreate = this.formBuilder.group({
      fullName: [this.employee.fullName || '', Validators.required],
      email: [
        this.employee.email || '',
        [Validators.required, Validators.email],
      ],
      phoneNumber: [this.employee.phoneNumber || '', Validators.required],
      dateOfBirth: [this.employee.dateOfBirth || '', Validators.required],
      address: [this.employee.address || '', Validators.required],
      gender: [this.employee.gender || GenderEnum.Male, Validators.required],
    });
  }

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
   * - Handle date serialization
   */
  saveModal() {
    if (this.formEditOrCreate.valid) {
      const dateFormatted = this.datePipe.transform(
        this.formEditOrCreate.get('dateOfBirth')?.value,
        'yyyy-MM-dd'
      );

      const updatedData = {
        ...this.modalConfigFromParent.initialData,
        ...this.formEditOrCreate.value,
        dateOfBirth: dateFormatted,
      };

      this.editOrCreateEmployee.emit(updatedData);

      // TODO: Will create a message box showing save successfully
      this.ref.close();
    }
  }
}
