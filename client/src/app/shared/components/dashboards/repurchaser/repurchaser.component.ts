import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { NavItemsModel } from '../../../../core/models/nav-items.model';

@Component({
  selector: 'app-repurchaser',
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
  templateUrl: './repurchaser.component.html',
  styleUrl: './repurchaser.component.scss',
})
export class RepurchaserComponent {
  // ===========================
  // == Fields
  // ===========================
  navItems: NavItemsModel[] = [
    { name: 'Đơn Hàng', icon: 'receipt', route: '/repurchaser/orders' },
    {
      name: 'Giỏ hàng mua lại ngoài cửa hàng',
      icon: 'add_shopping_cart',
      route: '/repurchaser/baskets-buyback-external',
    },
    { name: 'Giỏ Hàng', icon: 'shopping_cart', route: '/repurchaser/baskets' },
    {
      name: 'Chính Sách & Điều Khoản',
      icon: 'verified_user',
      route: '/repurchaser/policy',
    },
  ];
}
