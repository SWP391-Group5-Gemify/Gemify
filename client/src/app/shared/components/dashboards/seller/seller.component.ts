import { Component } from "@angular/core";
import { NavItemsModel } from "../../../../core/models/nav-items.model";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-seller",
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
  templateUrl: "./seller.component.html",
  styleUrl: "./seller.component.scss",
})
export class SellerComponent {
  // ===========================
  // == Fields
  // ===========================
  navItems: NavItemsModel[] = [
    { name: "Products", icon: "shopping_bag", route: "/seller/products" },
    { name: "Orders", icon: "receipt", route: "/seller/orders" },
    { name: "Baskets", icon: "shopping_cart", route: "/seller/baskets" },
    {
      name: "Check Exchange Policy",
      icon: "compare_arrows",
      route: "/seller/exchange",
    },
    {
      name: "Check Buy-back Policy",
      icon: "soap",
      route: "/seller/buyback",
    },
    {
      name: "Check Warranty",
      icon: "verified_user",
      route: "/seller/warranty",
    },
  ];
  // ===========================
  // == Methods
  // ===========================
}
