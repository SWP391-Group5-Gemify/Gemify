import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule, Location } from '@angular/common';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Observable, Observer } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { FormViewModalComponent } from '../../../shared/components/form-view-modal/form-view-modal.component';
import {
  ModalConfigModel,
  ModalModeEnum,
  ModalTitle,
} from '../../models/modal.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LogoComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  // ================================
  // == Fields
  // ================================
  private currentUserProfile!: UserModel;

  // Components if not login
  public navLinksNotLogin = [
    { id: 1, name: 'Login to System', route: '/' },
    { id: 2, name: 'Gold Chart', route: '/gold-chart' },
  ];

  public navLinksAlreadyLogin = [
    {
      id: 3,
      name: 'Show My Profile',
      action: () => this.openCurrentUserModal(),
    },
    { id: 4, name: 'Logout', action: () => this.logout() },
  ];

  // ================================
  // == Life Cycle
  // ================================
  constructor(
    public authService: AuthService,
    private router: Router,
    private location: Location,
    public viewModal: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCurrentUserProfile();
  }

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
   * Load the current user profile
   * TODO: Handle error route later
   */
  loadCurrentUserProfile() {
    this.authService.getCurrentUserProfile().subscribe({
      next: (data: any) => {
        this.currentUserProfile = data;
      },

      error: (err) => {
        // Handle Error later
        console.log(err);
      },
    });
  }

  /**
   * Open the modal for viewing
   */
  openCurrentUserModal() {
    const modalData: ModalConfigModel = {
      title: ModalTitle.ViewCurrentUserProfileTitle,
      mode: ModalModeEnum.View,
      initialData: {
        ...this.currentUserProfile,
      },
    };

    const dialogRef = this.viewModal.open(FormViewModalComponent, {
      width: '40%',
      height: '40vh',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: modalData,
    });
  }
}
