import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  // ===========================
  // == Fields
  // ===========================
  navItems: any = [
    { name: 'Dash Board', icon: 'home' },
    { name: 'Dash Board', icon: 'home' },
    { name: 'Dash Board', icon: 'home' },
    { name: 'Dash Board', icon: 'home' },
    { name: 'Dash Board', icon: 'home' },
    { name: 'Dash Board', icon: 'home' },
    { name: 'Dash Board', icon: 'home' },
    { name: 'Dash Board', icon: 'home' },
  ];
  // ===========================
  // == Methods
  // ===========================
}
