import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  ProductModel,
  ProductStatusEnum,
} from '../../../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BasketService } from '../../../../../core/services/basket/basket.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
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
  constructor(private basketService: BasketService, private router: Router) {}

  // ======================================
  // == Methods
  // ======================================
  /**
   * Add a product item to the cart
   */
  addProductItemToBasket() {
    this.product && this.basketService.addItemToCurrentBasket(this.product, 1);
  }

  /**
   * Implement the modal showing the product details
   */
  onGoToProductDetail() {
    this.router.navigate([this.router.url + '/' + this.product.id]);
  }
}
