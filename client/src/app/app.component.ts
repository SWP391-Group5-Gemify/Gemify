import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/layout/footer/footer.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { BasketService } from './core/services/basket/basket.service';
import { AuthService } from './core/services/auth/auth.service';
import { RoleEnum } from './core/models/role.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
})
export class AppComponent implements OnInit {
  // ==========================================
  // == Fields
  // ==========================================
  title = 'client';

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

    let isAllowedToLoadBaskets: boolean =
      allowedRoles.includes(this.authService.currentUser?.role as RoleEnum) &&
      this.authService.token != null;

    if (isAllowedToLoadBaskets) {
      const basketId = this.basketService.currentBasketId;
      basketId && this.basketService.loadCurrentBasket(basketId);
    }
  }
}
