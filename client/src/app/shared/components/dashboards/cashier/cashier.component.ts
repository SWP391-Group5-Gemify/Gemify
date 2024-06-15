import { Component } from '@angular/core';
import { NavItemsModel } from '../../../../core/models/nav-items.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';

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
  ],
  templateUrl: './cashier.component.html',
  styleUrl: './cashier.component.scss',
})
export class CashierComponent {
  // ===========================
  // == Fields
  // ===========================
  navItems: NavItemsModel[] = [
    { name: 'Products', icon: 'shopping_bag', route: '/cashier/products' },
    { name: 'Orders', icon: 'receipt', route: '/cashier/orders' },
    {
      name: 'Check Exchange Policy',
      icon: 'compare_arrows',
      route: '/cashier/exchange',
    },
    {
      name: 'Check Buy-back Policy',
      icon: 'soap',
      route: '/cashier/buyback',
    },
    {
      name: 'Check Warranty',
      icon: 'verified_user',
      route: '/cashier/warranty',
    },
  ];
  // ===========================
  // == Methods
  // ===========================
}
