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
    { name: 'Employees', icon: 'work', route: '/admin/employees' },
    { name: 'Counters', icon: 'attach_money', route: '/admin/counters' },
    { name: 'Customers', icon: 'family_restroom', route: '/admin/customers' },
    { name: 'Promotions', icon: 'card_giftcard', route: '/admin/promotions' },
    { name: 'Products', icon: 'shopping_bag', route: '/admin/products' },
    { name: 'Orders', icon: 'receipt', route: '/admin/orders' },
    {
      name: 'Customer Loyalty Program',
      icon: 'loyalty',
      route: '/admin/loyalty',
    },
    {
      name: 'Manage Exchange Policy',
      icon: 'compare_arrows',
      route: '/admin/exchange',
    },
    {
      name: 'Manage Gold Bid-Ask Spread',
      icon: 'price_change',
      route: '/admin/gold-bid-ask',
    },
    {
      name: 'Manage Buy-back Policy',
      icon: 'soap',
      route: '/admin/buyback',
    },
    {
      name: 'Manage Warranty',
      icon: 'verified_user',
      route: '/admin/warranty',
    },
  ];
  // ===========================
  // == Methods
  // ===========================
}
