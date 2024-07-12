import { Component } from '@angular/core';
import { NavItemsModel } from '../../../../core/models/nav-items.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BarcodeScannerComponent } from '../../../../barcode-scanner/barcode-scanner.component';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    RouterLink,
    RouterOutlet,
    BarcodeScannerComponent
  ],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.scss',
})
export class SellerComponent {
  // ===========================
  // == Fields
  // ===========================
  navItems: NavItemsModel[] = [
    { name: 'Trang Sức', icon: 'shopping_bag', route: '/seller/products' },
    { name: 'Đơn Hàng', icon: 'receipt', route: '/seller/orders' },
    { name: 'Giỏ Hàng', icon: 'shopping_cart', route: '/seller/baskets' },
    {
      name: 'Chính Sách & Điều Khoản',
      icon: 'soap',
      route: '/seller/buyback',
    },
  ];
  // ===========================
  // == Methods
  // ===========================
}
