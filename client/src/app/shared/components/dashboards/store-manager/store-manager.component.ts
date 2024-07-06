import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-store-manager',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
  templateUrl: './store-manager.component.html',
  styleUrl: './store-manager.component.scss',
})
export class StoreManagerComponent {
  // ===========================
  // == Fields
  // ===========================
  navItems: any = [
    {
      name: 'Statistic Dashboard',
      icon: 'home',
      route: '/store-manager/statistic-dashboard',
    },
    { name: 'Employees', icon: 'work', route: '/store-manager/employees' },
    {
      name: 'Counters',
      icon: 'attach_money',
      route: '/store-manager/counters',
    },
    {
      name: 'Customers',
      icon: 'family_restroom',
      route: '/store-manager/customers',
    },
    {
      name: 'Promotions',
      icon: 'card_giftcard',
      route: '/store-manager/promotions',
    },
    {
      name: 'Products',
      icon: 'shopping_bag',
      route: '/store-manager/products-management',
    },
    { name: 'Orders', icon: 'receipt', route: '/store-manager/orders' },
  ];

  // ===========================
  // == Methods
  // ===========================
}
