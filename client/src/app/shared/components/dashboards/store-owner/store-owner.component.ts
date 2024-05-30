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
    {
      name: 'Statistic Dashboard',
      icon: 'home',
      route: '/store-owner/statistic-dashboard',
    },
    { name: 'Employees', icon: 'work', route: '/store-owner/employees' },
    { name: 'Counters', icon: 'attach_money', route: '/store-owner/counters' },
    {
      name: 'Customers',
      icon: 'family_restroom',
      route: '/store-owner/customers',
    },
    {
      name: 'Promotions',
      icon: 'card_giftcard',
      route: '/store-owner/promotions',
    },
    { name: 'Products', icon: 'shopping_bag', route: '/store-owner/products' },
    { name: 'Orders', icon: 'receipt', route: '/store-owner/orders' },
    {
      name: 'Customer Loyalty Program',
      icon: 'loyalty',
      route: '/store-owner/loyalty',
    },
    {
      name: 'Manage Exchange Policy',
      icon: 'compare_arrows',
      route: '/store-owner/exchange',
    },
    {
      name: 'Manage Gold Bid-Ask Spread',
      icon: 'price_change',
      route: '/store-owner/gold-bid-ask',
    },
    {
      name: 'Manage Buy-back Policy',
      icon: 'soap',
      route: '/store-owner/buyback',
    },
    {
      name: 'Manage Warranty',
      icon: 'verified_user',
      route: '/store-owner/warranty',
    },
  ];
  // ===========================
  // == Methods
  // ===========================
}
