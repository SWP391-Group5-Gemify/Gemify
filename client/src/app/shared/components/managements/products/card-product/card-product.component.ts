import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  ProductModel,
  ProductStatusEnum,
} from '../../../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { RoleEnum, RoleModel } from '../../../../../core/models/role.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
})
export class CardProductComponent {
  // ======================================
  // == Fields
  // ======================================
  public ProductStatusEnum = ProductStatusEnum;
  @Input() product!: ProductModel;
  @Output() addToCart = new EventEmitter<ProductModel>();
  @Output() viewDetail = new EventEmitter<ProductModel>();

  // ======================================
  // == Methods
  // ======================================
  /**
   * Delegate add to cart to the parent component
   */
  addToCartFromChild() {
    this.addToCart.emit(this.product);
  }

  /**
   * Delegate view product detail to the parent component
   */
  viewProductDetailFromChild() {
    this.viewDetail.emit(this.product);
  }
}
