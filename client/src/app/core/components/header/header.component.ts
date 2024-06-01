import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LogoComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // ================================
  // == Fields
  // ================================

  // Components if not login
  public navLinksNotLogin = [
    { id: 1, name: 'Login to System', route: '/' },
    { id: 2, name: 'Gold Chart', route: '/gold-chart' },
  ];

  public navLinksAlreadyLogin = [{ id: 3, name: 'Logout' }];

  // ================================
  // == Life Cycle
  // ================================
  constructor(
    public authService: AuthService,
    private router: Router,
    private location: Location
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
}
