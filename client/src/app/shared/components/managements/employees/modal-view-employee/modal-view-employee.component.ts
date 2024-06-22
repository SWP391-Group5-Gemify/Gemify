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
<<<<<<< HEAD
=======
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../../../core/services/auth/auth.service';
>>>>>>> de5ea53bd976468ff3e217a71a03350fb049420d

@Component({
  selector: 'app-modal-view-employee',
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
<<<<<<< HEAD
=======
    MatIcon,
>>>>>>> de5ea53bd976468ff3e217a71a03350fb049420d
    MatButtonToggleModule,
  ],
  templateUrl: './modal-view-employee.component.html',
  styleUrl: './modal-view-employee.component.scss',
  providers: [provideNativeDateAdapter()],
})
<<<<<<< HEAD
export class ModalViewEmployeeComponent implements OnInit {
  // =========================
  // == Fields
  // =========================
  public modalDataConfig!: ModalConfigModel;
=======
export class ModalViewCurrentUserComponent implements OnInit {
  // =========================
  // == Fields
  // =========================
  public currentUserInfo!: UserModel;
>>>>>>> de5ea53bd976468ff3e217a71a03350fb049420d

  // =========================
  // == Life cycle
  // =========================
  constructor(
<<<<<<< HEAD
    private ref: MatDialogRef<ModalEditCreateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public dataFromParent: any
  ) {}

  ngOnInit(): void {
    this.modalDataConfig = this.dataFromParent;
=======
    @Inject(MAT_DIALOG_DATA) public modalConfigFromParent: ModalConfigModel,
    private modalRef: MatDialogRef<ModalViewCurrentUserComponent>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  // =========================
  // == Methods
  // =========================

  /**
   * Load the current user
   */
  loadCurrentUser() {
    this.authService.getCurrentUserProfile().subscribe((user: UserModel) => {
      this.currentUserInfo = user;
    });
  }

  /**
   * Closing the modal
   */
  onCloseModal() {
    this.modalRef.close();
>>>>>>> de5ea53bd976468ff3e217a71a03350fb049420d
  }
}
