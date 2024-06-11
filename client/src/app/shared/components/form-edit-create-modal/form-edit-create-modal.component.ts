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
import { UserModel } from '../../../core/models/user.model';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { Observable, Subscription } from 'rxjs';
import {
  GenderEnum,
  GenderModel,
} from '../../../core/models/gender-model.model';
import { RoleModel } from '../../../core/models/role-model.model';
import EnumUtils from '../../utils/EnumUtils';
import { ModalConfigModel } from '../../../core/models/modal.model';

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
  providers: [provideNativeDateAdapter(), DatePipe],
})
export class FormEditCreateModalComponent implements OnInit {
  // =========================
  // == Fields
  // =========================

  @Output() editDataFromChild = new EventEmitter<any>();
  public formEditOrCreate!: FormGroup;
  public modalDataConfig!: ModalConfigModel;
  public genderOptions: GenderModel[];
  public roleOptions$!: Observable<RoleModel[]>;

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
    @Inject(MAT_DIALOG_DATA) public dataFromParent: any,
    private ref: MatDialogRef<FormEditCreateModalComponent>,
    private employeeService: EmployeeService,
    private datePipe: DatePipe
  ) {
    this.genderOptions = EnumUtils.enumToObject(GenderEnum);
    this.roleOptions$ = employeeService.getEmployeeRoles();
  }

  ngOnInit(): void {
    // Load config data passed from the parent
    this.modalDataConfig = this.dataFromParent;

    this.formEditOrCreate = this.formBuilder.group({
      fullName: [
        this.modalDataConfig.initialData.fullName || '',
        Validators.required,
      ],
      email: [
        this.modalDataConfig.initialData.email || '',
        [Validators.required, Validators.email],
      ],

      phoneNumber: [
        this.modalDataConfig.initialData.phoneNumber || '',
        Validators.required,
      ],
      dateOfBirth: [
        this.modalDataConfig.initialData.dateOfBirth || '',
        Validators.required,
      ],
      address: [
        this.modalDataConfig.initialData.address || '',
        Validators.required,
      ],
      gender: [
        this.modalDataConfig.initialData.gender || GenderEnum.Male,
        Validators.required,
      ],

      //TODO: Fix the bullshit bug coming from Backend
      // password: [this.inputData.password || '', Validators.required],
      // role: [this.inputData.role || RoleEnum.Seller || '', Validators.required],
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
   * - Handle date serialization
   */
  saveModal() {
    if (this.formEditOrCreate.valid) {
      const dateFormatted = this.datePipe.transform(
        this.formEditOrCreate.get('dateOfBirth')?.value,
        'yyyy-MM-dd'
      );

      const updatedData = {
        ...this.modalDataConfig.initialData,
        ...this.formEditOrCreate.value,
        dateOfBirth: dateFormatted,
      };

      // Let the base class handle the event
      this.editDataFromChild.emit(updatedData);
      this.ref.close();
    }
  }
}
