import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/layout/footer/footer.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { BasketService } from './core/services/basket/basket.service';
import { AuthService } from './core/services/auth/auth.service';
import { RoleEnum } from './core/models/role.model';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NgxSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe]
})
export class AppComponent implements OnInit {
  // ==========================================
  // == Fields
  // ==========================================

  // ==========================================
  // == Lifecycle
  // ==========================================
  constructor(
    private basketService: BasketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadBasketOnBasketIdLocalStorage();
  }

  // ==========================================
  // == Methods
  // ==========================================
  /**
   * Loading the Basket on basket_id on Local Storage
   * - Must have JWT, or else does not load the basket from redis
   * - Cashier, Seller, Repurchasher are only 3 roles to load baskets
   */
  loadBasketOnBasketIdLocalStorage() {
    const allowedRoles: RoleEnum[] = [
      RoleEnum.Cashier,
      RoleEnum.Seller,
      RoleEnum.Repurchaser,
    ];

    let isRoleAllowedToLoadBaskets: boolean = allowedRoles.includes(
      this.authService.currentUser()?.role as RoleEnum
    );

    if (isRoleAllowedToLoadBaskets && this.authService.token != null) {
      const basketId = this.basketService.currentBasketIdLocalStorage;
      basketId && this.basketService.loadBasketById(basketId);
    }
  }
}
