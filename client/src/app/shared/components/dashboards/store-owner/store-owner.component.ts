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
    {
      name: 'Products',
      icon: 'shopping_bag',
      route: '/store-owner/products-management',
    },
    { name: 'Orders', icon: 'receipt', route: '/store-owner/orders' },
    {
      name: 'Manage Gold Bid-Ask Spread',
      icon: 'price_change',
      route: '/store-owner/gold-bid-ask',
    },
    {
      name: 'Manage Policy',
      icon: 'verified_user',
      route: '/store-owner/policy',
    },
  ];
}
