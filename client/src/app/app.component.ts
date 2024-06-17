import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./core/layout/footer/footer.component";
import { HeaderComponent } from "./core/layout/header/header.component";
import { BasketService } from "./core/services/basket/basket.service";
import { AuthService } from "./core/services/auth/auth.service";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
})
export class AppComponent implements OnInit {
  title = "client";

  constructor(
    private basketService: BasketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadBasketOnBasketIdLocalStorage();
  }

  /**
   * Loading the Basket on basket_id on Local Storage
   * - Must have JWT, or else does not load the basket from redis
   */
  loadBasketOnBasketIdLocalStorage() {
    if (this.authService.token) {
      const basketId = this.basketService.basketId;
      basketId && this.basketService.getBasket(basketId);
    }
  }
}
