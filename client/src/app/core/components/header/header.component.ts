import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LogoComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // ================================
  // == Normal + Authenticated Users
  // ================================

  // Components if not login
  public componentsNotLogin = [
    { id: 1, name: 'Login to System', route: '/' },
    { id: 2, name: 'Gold Chart', route: '/gold-chart' },
  ];

  public componentsAlreadyLogin = [{ id: 1, name: 'Logout', route: '/' }];

  constructor(public authService: AuthService) {}
}
