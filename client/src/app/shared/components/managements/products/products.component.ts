import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CardProductComponent } from '../../card-product/card-product.component';
import { catchError, map, Observable } from 'rxjs';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { ProductService } from '../../../../core/services/product/product.service';
import { ProductModel } from '../../../../core/models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatIcon,
    MatBadgeModule,
    CardProductComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  // ==========================================
  // == Fields
  // ==========================================
  products$!: Observable<ProductModel[]>;
  paginatorConfig = {
    pageSize: 10,
    pageIndex: 0,
    totalProducts: 0,
  };
  pageEvent!: PageEvent;

  // ====================
  // == Life Cycle
  // ====================
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // ====================
  // == Methods
  // ====================

  /**
   * Apply paginator on changing a page
   * @param e
   */
  onPageChange(e: PageEvent) {
    this.paginatorConfig.pageIndex = e.pageIndex;
    this.paginatorConfig.pageSize = e.pageSize;
    this.loadProducts();
  }

  /**
   * Load products based on pagination
   * TODO: Handle the errro exception
   */
  loadProducts() {
    this.products$ = this.productService
      .getProducts(
        this.paginatorConfig.pageIndex + 1,
        this.paginatorConfig.pageSize
      )
      .pipe(
        map((response: PaginationModel<ProductModel>) => {
          this.paginatorConfig.pageIndex = response.pageIndex - 1;
          this.paginatorConfig.pageSize = response.pageSize;
          this.paginatorConfig.totalProducts = response.count;
          return response.data;
        }),
        catchError((error) => {
          console.error('Error loading products', error);
          throw error;
        })
      );
  }
}
