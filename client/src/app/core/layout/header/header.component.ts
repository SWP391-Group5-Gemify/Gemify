import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule, Location } from '@angular/common';
import { UserModel } from '../../../core/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import {
  ModalConfigModel,
<<<<<<< HEAD
  ModalEmployeeModeEnum,
  ModalEmployeeTitle,
} from '../../../core/models/modal.model';
import { ModalViewEmployeeComponent } from '../../../shared/components/managements/employees/modal-view-employee/modal-view-employee.component';
=======
  ModalModeEnum,
  ModalTitle,
} from '../../../core/models/modal.model';
import { ModalViewCurrentUserComponent } from '../../../shared/components/managements/employees/modal-view-employee/modal-view-employee.component';
import { MatIcon } from '@angular/material/icon';
>>>>>>> de5ea53bd976468ff3e217a71a03350fb049420d

@Component({
  selector: 'app-header',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterLink, LogoComponent, CommonModule],
=======
  imports: [RouterLink, LogoComponent, CommonModule, MatIcon],
>>>>>>> de5ea53bd976468ff3e217a71a03350fb049420d
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // ================================
  // == Fields
  // ================================
<<<<<<< HEAD
  private currentUserProfile!: UserModel;
=======
>>>>>>> de5ea53bd976468ff3e217a71a03350fb049420d

  // Components if not login
  public navLinks = {
    login: { name: 'Login to System', route: '/' },
    goldChart: { name: 'Gold Chart', route: '/gold-chart' },
    showProfile: {
      name: 'Show My Profile',
      action: () => this.openCurrentUserModal(),
    },
    logout: { name: 'Logout', action: () => this.logout() },
  };
  // ================================
  // == Life Cycle
  // ================================
  constructor(
    public authService: AuthService,
    private router: Router,
    private location: Location,
    public viewModal: MatDialog
  ) {}
  // ================================
  // == Methods
  // ================================

  //TODO: Prevent user going back to the previous state
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true }).then(() => {
      this.location.replaceState('/');
    });
  }

  /**
<<<<<<< HEAD
   * Load the current user profile
   */
  loadCurrentUserProfile() {
    this.authService.getCurrentUserProfile().subscribe({
      next: (data: UserModel) => {
        this.currentUserProfile = data;
      },

      error: (err) => {
        // Handle Error later
        console.error(err);
      },
    });
  }

  /**
   * Open the modal for viewing
   */
  openCurrentUserModal() {
    this.loadCurrentUserProfile();

    const modalData: ModalConfigModel = {
      title: ModalEmployeeTitle.ViewCurrentUserProfileTitle,
      mode: ModalEmployeeModeEnum.View,
      initialData: {
        ...this.currentUserProfile,
      },
    };

    const dialogRef = this.viewModal.open(ModalViewEmployeeComponent, {
      width: '40%',
      height: '40vh',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: modalData,
=======
   * Open the modal for viewing
   */
  openCurrentUserModal() {
    const modalData: ModalConfigModel = {
      title: ModalTitle.ViewCurrentUserProfileTitle,
      mode: ModalModeEnum.View,
      closeButtonLabel: 'Close Profile',
    };

    const dialogRef = this.viewModal.open(ModalViewCurrentUserComponent, {
      width: '40%',
      height: '74%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: modalData,
      disableClose: true,
>>>>>>> de5ea53bd976468ff3e217a71a03350fb049420d
    });
  }
}
