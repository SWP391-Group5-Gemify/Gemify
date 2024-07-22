import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavItemsModel } from '../../../../core/models/nav-items.model';
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
    RouterLinkActive,
  ],
  templateUrl: './store-owner.component.html',
  styleUrl: './store-owner.component.scss',
})
export class StoreOwnerComponent {
  // ===========================
  // == Fields
  // ===========================
  navItems: NavItemsModel[] = [
    {
      name: 'Bảng Thống Kê',
      icon: 'home',
      route: '/store-owner/statistic-dashboard',
    },
    {
      name: 'Quản Lý Nhân Viên',
      icon: 'work',
      route: '/store-owner/employees',
    },
    {
      name: 'Quản Lý Quầy',
      icon: 'attach_money',
      route: '/store-owner/counters',
    },
    {
      name: 'Quản Lý Khách Hàng',
      icon: 'family_restroom',
      route: '/store-owner/customers',
    },
    {
      name: 'Quản Lý Ưu Đãi',
      icon: 'card_giftcard',
      route: '/store-owner/promotions',
    },
    {
      name: 'Quản Lý Trang Sức',
      icon: 'shopping_bag',
      route: '/store-owner/products-management',
    },
    { name: 'Đơn Hàng', icon: 'receipt', route: '/store-owner/orders' },
    {
      name: 'Cập Nhật Giá Vàng',
      icon: 'price_change',
      route: '/store-owner/gold-bid-ask',
    },
    {
      name: 'Quản Lý Chính Sách & Điều Khoản',
      icon: 'verified_user',
      route: '/store-owner/policy',
    },
  ];
}
