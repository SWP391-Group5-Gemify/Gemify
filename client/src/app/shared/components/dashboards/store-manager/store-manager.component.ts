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
      name: 'Bảng Thống Kê',
      icon: 'home',
      route: '/store-manager/statistic-dashboard',
    },
    {
      name: 'Quản Lý Quầy Hàng',
      icon: 'attach_money',
      route: '/store-manager/counters',
    },
    {
      name: 'Quản Lý Nhân Viên',
      icon: 'work',
      route: '/store-manager/employees',
    },
    {
      name: 'Quản Lý Khách Hàng',
      icon: 'family_restroom',
      route: '/store-manager/customers',
    },
    {
      name: 'Ưu Đãi',
      icon: 'card_giftcard',
      route: '/store-manager/promotions',
    },
    {
      name: 'Quản Lý Trang Sức',
      icon: 'shopping_bag',
      route: '/store-manager/products-management',
    },
    { name: 'Đơn Hàng', icon: 'receipt', route: '/store-manager/orders' },
    {
      name: 'Chính Sách & Điều Khoản',
      icon: 'verified_user',
      route: '/store-manager/policy',
    },
  ];

  // ===========================
  // == Methods
  // ===========================
}
