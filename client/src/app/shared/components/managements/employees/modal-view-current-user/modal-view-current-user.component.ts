import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
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
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-modal-view-current-user',
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
    MatIcon,
    MatButtonToggleModule,
  ],
  templateUrl: './modal-view-current-user.component.html',
  styleUrl: './modal-view-current-user.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class ModalViewCurrentUserComponent implements OnInit {
  // =========================
  // == Fields
  // =========================
  public currentUserInfo!: UserModel;

  // =========================
  // == Life cycle
  // =========================
  constructor(
    private modalRef: MatDialogRef<ModalViewCurrentUserComponent>,
    @Inject(MAT_DIALOG_DATA) public modalConfigFromParent: ModalConfigModel,
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
  }
}
