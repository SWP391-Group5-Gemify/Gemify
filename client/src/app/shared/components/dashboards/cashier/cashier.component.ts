import { Component } from '@angular/core';
import { NavItemsModel } from '../../../../core/models/nav-items.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BarcodeScannerComponent } from '../../barcode-scanner/barcode-scanner.component';

@Component({
  selector: 'app-cashier',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    RouterLink,
    RouterOutlet,
    BarcodeScannerComponent,
  ],
  templateUrl: './cashier.component.html',
  styleUrl: './cashier.component.scss',
})
export class CashierComponent {
  // ===========================
  // == Fields
  // ===========================
  navItems: NavItemsModel[] = [
    { name: 'Giỏ Hàng', icon: 'shopping_cart', route: '/cashier/baskets' },
    { name: 'Đơn Hàng', icon: 'receipt', route: '/cashier/orders' },
    {
      name: 'Khách Hàng',
      icon: 'family_restroom',
      route: '/cashier/customers',
    },
    {
      name: 'Ưu Đãi',
      icon: 'card_giftcard',
      route: '/cashier/promotions',
    },
    {
      name: 'Chính Sách & Điều Khoản',
      icon: 'verified_user',
      route: '/cashier/policy',
    },
  ];
  // ===========================
  // == Methods
  // ===========================
}
