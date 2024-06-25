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

import { MatIcon } from '@angular/material/icon';
import { ModalViewCurrentUserComponent } from '../../../shared/components/managements/employees/modal-view-current-user/modal-view-current-user.component';
import { NavItemsModel } from '../../models/nav-items.model';

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
    login: { name: 'Đăng nhập', route: '/', icon: 'login' },
    goldChart: { name: 'Biểu đồ vàng', route: '/gold-chart', icon: 'paid' },
    showProfile: {
      name: 'Hồ sơ cá nhân',
      action: () => this.openCurrentUserModal(),
      icon: 'account_circle',
    },
    logout: { name: 'Đăng xuất', action: () => this.logout(), icon: 'logout' },
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

  /**
   * Logout user from the screen
   */
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true }).then(() => {
      this.location.replaceState('/');
    });
  }

  /**
   * Open the modal for viewing
   * TODO: Bug on reloading page when closing the dialog
   */
  openCurrentUserModal() {
    const modalData: ModalConfigModel = {
      title: ModalTitle.ViewCurrentUserProfileTitle,
      mode: ModalModeEnum.View,
      closeButtonLabel: 'Close Profile',
    };

    this.viewModal.open(ModalViewCurrentUserComponent, {
      disableClose: true,
      width: '40%',
      height: '80%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: modalData,
    });
  }
}
