import { Component, EventEmitter, Input, input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {
  ProductModel,
  ProductStatusEnum,
} from "../../../../../core/models/product.model";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { BasketService } from "../../../../../core/services/basket/basket.service";

@Component({
  selector: "app-card-product",
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: "./card-product.component.html",
  styleUrl: "./card-product.component.scss",
})
export class CardProductComponent {
  // ======================================
  // == Fields
  // ======================================
  public ProductStatusEnum = ProductStatusEnum;
  @Input() product!: ProductModel;

  // ======================================
  // == Life Cycle
  // ======================================
  constructor(private basketService: BasketService) {}

  // ======================================
  // == Methods
  // ======================================
  /**
   * Add a product item to the cart
   */
  addProductItemToCartFromChild() {
    console.log("Adding to cart");
    this.product && this.basketService.addItemToBasket(this.product, 1);
  }

  /**
   * Implement the modal showing the product details
   */
  viewProductDetailFromChild() {}
}
