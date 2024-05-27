import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // ================================
  // == Normal + Authenticated Users
  // ================================

  // Links
  navLinks = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Live Gold Chart' },
  ];

  // Login
  loginLinks = { id: 1, name: 'Login' };

  // Logo
  logo = { id: 1, name: 'Gemify', src: '' };
}
