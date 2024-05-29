import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-store-owner',
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
  templateUrl: './store-owner.component.html',
  styleUrl: './store-owner.component.scss',
})
export class StoreOwnerComponent {
  // ===========================
  // == Fields
  // ===========================
  navItems: any = [
    { name: 'Statistic Dashboard', icon: 'home', route: '/admin/dashboard' },
    { name: 'Manage Employees', icon: 'home', route: '/admin/employees' },
    { name: 'Manage Counters', icon: 'home', route: '/admin/counters' },
    { name: 'Manage Customers', icon: 'home', route: '/admin/customers' },
    { name: 'Manage Promotions', icon: 'home', route: '/admin/dashboard' },
    { name: 'Manage Products', icon: 'home', route: '/admin/dashboard' },
    { name: 'Manage Orders', icon: 'home', route: '/admin/dashboard' },
    {
      name: 'Manage Customer Loyalty Program',
      icon: 'home',
      route: '/admin/dashboard',
    },
    { name: 'Manage Exchange Policy', icon: 'home', route: '/admin/dashboard' },
    {
      name: 'Manage Gold Bid-Ask Spread',
      icon: 'home',
      route: '/admin/dashboard',
    },
    { name: 'Manage Buy-back Policy', icon: 'home', route: '/admin/dashboard' },
    { name: 'Manage Warranty', icon: 'home', route: '/admin/dashboard' },
  ];
  // ===========================
  // == Methods
  // ===========================
}
