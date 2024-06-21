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
  ModalEmployeeModeEnum,
} from '../../../../../core/models/modal.model';
import { RoleEnum, RoleModel } from '../../../../../core/models/role.model';
import { EmployeeService } from '../../../../../core/services/employee/employee.service';
import EnumUtils from '../../../../utils/EnumUtils';
import { EmployeeModel } from '../../../../../core/models/employee.model';
import { MatIcon } from '@angular/material/icon';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';
import { GenericDropdownComponent } from '../../../generic-dropdown/generic-dropdown.component';
import { DropdownModel } from '../../../../../core/models/dropdown.model';

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
    GenericDropdownComponent,
  ],
  templateUrl: './modal-edit-create-employee.component.html',
  styleUrl: './modal-edit-create-employee.component.scss',
  providers: [provideNativeDateAdapter(), DatePipe],
})
export class ModalEditCreateEmployeeComponent implements OnInit {
  // =========================
  // == Fields
  // =========================

  public formEditOrCreate!: FormGroup;
  public genderOptions!: GenderModel[];
  public roleOptions!: DropdownModel[];
  public employee!: EmployeeModel;

  // =========================
  // == Life cycle
  // =========================
  /**
   * Constructor
   * @param formBuilder
   * @param dataFromParent
   * @param modalRef
   */
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public modalConfigFromParent: ModalConfigModel,
    private modalRef: MatDialogRef<ModalEditCreateEmployeeComponent>,
    private employeeService: EmployeeService,
    private datePipe: DatePipe,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.employee =
      this.modalConfigFromParent.initialData ?? new EmployeeModel();

    switch (this.modalConfigFromParent.mode) {
      case ModalEmployeeModeEnum.Edit: {
        this.loadFormIfEdit();
        this.loadGenderRadioButtons();
        break;
      }
      case ModalEmployeeModeEnum.Create: {
        this.loadRoles();
        this.loadGenderRadioButtons();
        this.loadFormIfCreate();
        break;
      }
    }
  }

  // =========================
  // == Methods
  // =========================

  /**
   * Load all roles within the database
   * - Due to the inconsistency on API, I have to key must be a name to update the employee
   */
  loadRoles() {
    this.employeeService.getEmployeeRoles().subscribe((roles: RoleModel[]) => {
      this.roleOptions = roles.map((role) => ({
        value: role.name,
        name: role.name,
      }));
    });
  }

  /**
   * Set initial values for forms if in EDIT mode
   */
  loadFormIfEdit() {
    this.formEditOrCreate = this.formBuilder.group({
      fullName: [this.employee?.fullName ?? '', Validators.required],
      email: [
        this.employee?.email ?? '',
        [Validators.required, Validators.email],
      ],
      phoneNumber: [this.employee?.phoneNumber ?? '', Validators.required],
      dateOfBirth: [this.employee?.dateOfBirth ?? '', Validators.required],
      address: [this.employee?.address ?? '', Validators.required],
      gender: [this.employee?.gender ?? GenderEnum.Male, Validators.required],
    });
  }

  /**
   * Set initial values for forms if in EDIT mode
   */
  loadFormIfCreate() {
    this.formEditOrCreate = this.formBuilder.group({
      fullName: [this.employee?.fullName ?? '', Validators.required],
      email: [
        this.employee?.email ?? '',
        [Validators.required, Validators.email],
      ],
      phoneNumber: [this.employee?.phoneNumber ?? '', Validators.required],
      dateOfBirth: [this.employee?.dateOfBirth ?? '', Validators.required],
      address: [this.employee?.address ?? '', Validators.required],
      gender: [this.employee?.gender ?? GenderEnum.Male, Validators.required],
      userName: [this.employee?.userName ?? '', Validators.required],
      password: [this.employee?.password ?? '', Validators.required],
      role: [this.employee?.role ?? RoleEnum.Seller, Validators.required],
      image_url: [
        this.employee?.image_Url ?? 'wwwroot/my.png',
        Validators.required,
      ],
    });
  }

  /**
   * Load the genders for radio button
   */
  loadGenderRadioButtons() {
    this.genderOptions = EnumUtils.enumToObject(GenderEnum);
  }

  /**
   * Choosing employee role on dropdown
   * @param event
   */
  onSelectionChangeRoleNameFromParent(event: any) {
    this.employee.role = event.value;
  }

  /**
   * Close the modal
   * - Pass the edited data back to the parent
   */
  onCloseModal() {
    this.modalRef.close();
  }

  /**
   * Save the updated data
   * - Emit data to the parent component for service handling
   * - Handle both edit and create
   * - Handle date serialization
   */
  onSaveModal() {
    if (this.formEditOrCreate.valid) {
      const dateFormatted = this.datePipe.transform(
        this.formEditOrCreate.get('dateOfBirth')?.value,
        'yyyy-MM-dd'
      );

      const dataFromForm: EmployeeModel = {
        ...this.employee,
        ...this.formEditOrCreate.value,
        dateOfBirth: dateFormatted,
      };

      // Based on the mode to handle the related action
      if (ModalEmployeeModeEnum.Edit) {
        this.editEmployee(dataFromForm);
      } else {
        this.createEmployee(dataFromForm);
      }
    }
  }

  editEmployee(updatedEmployee: EmployeeModel) {
    this.employeeService.updateEmployee(updatedEmployee).subscribe({
      next: (response: any) => {
        this.snackbarService.show(
          `Employee with ID = ${this.employee?.id} updated successfully`
        );
      },

      error: (err) => {
        console.error(err);
        this.snackbarService.show('Error updating employee', 'Retry', 5000);
      },
    });
  }

  createEmployee(newEmployee: EmployeeModel) {
    console.log(newEmployee);

    this.employeeService.registerNewEmployee(newEmployee).subscribe({
      next: (response: any) => {
        this.snackbarService.show(`Create new account for `);
      },
    });
  }
}
