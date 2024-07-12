import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProductModel } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product/product.service';

@Component({
  selector: 'app-product-details-management',
  standalone: true,
  imports: [MatIcon, CommonModule, MatExpansionModule],
  templateUrl: './product-details-management.component.html',
  styleUrl: './product-details-management.component.scss',
})
export class ProductDetailsManagementComponent implements OnInit {
  // ===========================
  // == Fields
  // ===========================
  public product$!: Observable<ProductModel>;

  // ===========================
  // == Lifecycle
  // ===========================
  constructor(
    private productService: ProductService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProductOnId();
  }

  // ===========================
  // == Methods
  // ===========================

  /**
   * Go back to the products management page
   */
  onGoBackToProductsManagement() {
    this.location.back();
  }

  /**
   * Load product's information based on product id
   */
  public loadProductOnId() {
    const productId = this.activatedRoute.snapshot.params['id'];
    this.product$ = this.productService.getProductById(Number(productId));
  }
}
