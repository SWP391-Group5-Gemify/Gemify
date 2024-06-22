import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule, Location } from '@angular/common';
import { UserModel } from '../../../core/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import {
  ModalConfigModel,
  ModalModeEnum,
  ModalTitle,
} from '../../../core/models/modal.model';
import { ModalViewCurrentUserComponent } from '../../../shared/components/managements/employees/modal-view-employee/modal-view-employee.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LogoComponent, CommonModule, MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // ================================
  // == Fields
  // ================================

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
    });
  }
}
