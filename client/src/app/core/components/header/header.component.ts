import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // ================================
  // == Normal + Authenticated Users
  // ================================

  // Links
  navLinks = [
    { id: 1, name: 'Login', route: '/' },
    { id: 2, name: 'Gold Chart', route: '/gold-chart' },
  ];

  // Login
  loginLinks = { id: 1, name: 'Login', route: '/login' };
}
