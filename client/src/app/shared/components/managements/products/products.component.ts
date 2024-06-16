import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { catchError, map, mergeMap, Observable } from 'rxjs';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { ProductService } from '../../../../core/services/product/product.service';
import {
  ProductModel,
  ProductsSearchingCriteriaModel,
  SortProductsQuantityEnum,
  SubCategoryModel,
} from '../../../../core/models/product.model';
import { MatInputModule } from '@angular/material/input';
import { GenericDropdownComponent } from '../../generic-dropdown/generic-dropdown.component';
import { DropdownModel } from '../../../../core/models/dropdown.model';
import { GoldModel } from '../../../../core/models/gold.model';
import { GoldService } from '../../../../core/services/gold/gold.service';
import { CardProductComponent } from './card-product/card-product.component';
import { GenericSearchComponent } from '../../generic-search/generic-search.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIcon,
    CardProductComponent,
    MatInputModule,
    GenericDropdownComponent,
    GenericSearchComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  // ==========================================
  // == Fields
  // ==========================================
  products$!: Observable<ProductModel[]>;
  productSearchCriteria: ProductsSearchingCriteriaModel = {
    pageSize: 10,
    pageIndex: 0,
    search: undefined,
    goldTypeId: undefined,
    subCategoryId: undefined,
    sortQuantity: undefined,
  };
  totalProducts: number = 0;
  pageEvent!: PageEvent;
  goldsDropdown!: DropdownModel[];
  subCategoriesDropdown!: DropdownModel[];
  sortsCriteriaDropdown: DropdownModel[] = [
    {
      name: '↓ Số lượng: giảm dần',
      value: SortProductsQuantityEnum.QuantityDesc,
    },
    {
      name: '↑ Số lượng: tăng dần',
      value: SortProductsQuantityEnum.QuantityAsc,
    },
  ];

  @ViewChild('goldsDropdownRef') goldsDropdownRef!: GenericDropdownComponent;
  @ViewChild('subCategoriesDropdownRef')
  subCategoriesDropdownRef!: GenericDropdownComponent;
  @ViewChild('sortsCriteriaDropdownRef')
  sortsCriteriaDropdownRef!: GenericDropdownComponent;
  @ViewChild('nameSearchInputRef') nameSearchInputRef!: GenericSearchComponent;

  // ====================
  // == Life Cycle
  // ====================
  constructor(
    private productService: ProductService,
    private goldService: GoldService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadSubCategories();
    this.loadGolds();
  }

  // ====================
  // == Methods
  // ====================

  /**
   * Apply paginator on changing a page
   * @param e
   */
  onPageChange(e: PageEvent) {
    this.productSearchCriteria.pageIndex = e.pageIndex;
    this.productSearchCriteria.pageSize = e.pageSize;
    this.loadProducts();
  }

  /**
   * Load products based on pagination
   * TODO: Handle the errro exception
   */
  loadProducts() {
    this.products$ = this.productService
      .getProducts({
        ...this.productSearchCriteria,
        pageIndex: this.productSearchCriteria.pageIndex + 1,
      })
      .pipe(
        map((response: PaginationModel<ProductModel>) => {
          this.productSearchCriteria.pageIndex = response.pageIndex - 1;
          this.productSearchCriteria.pageSize = response.pageSize;
          this.totalProducts = response.count;
          return response.data;
        }),
        catchError((error) => {
          console.error('Error loading products', error);
          throw error;
        })
      );
  }

  /**
   * Load all SubCategories, and map to the the key - value pair of * the dropdown component
   * TODO: Handle error when load failed
   */
  loadSubCategories() {
    this.productService
      .getSubCategories()
      .pipe(
        map((subCategories: SubCategoryModel[]) => {
          return subCategories.map((subCategory: SubCategoryModel) => ({
            value: subCategory.id,
            name: subCategory.name,
          }));
        })
      )
      .subscribe({
        next: (subCategories: any) => {
          this.subCategoriesDropdown = subCategories;
        },

        error(err) {
          console.error(err);
        },
      });
  }

  /**
   * Load all gold types and map to the dropdown component
   * TODO: Handle error when load failed
   */
  loadGolds() {
    this.goldService.getAllGolds().subscribe({
      next: (response: PaginationModel<GoldModel>) => {
        this.goldsDropdown = response.data.map((gold) => ({
          value: gold.id,
          name: gold.name,
        }));
      },

      error(err) {
        console.error(err);
      },
    });
  }

  /**
   * Select Gold Id from the dropdown
   * @param $event
   */
  onSelectChangeGoldIdFromParent(event: any) {
    this.productSearchCriteria.goldTypeId = event?.value;
    this.loadProducts();
  }

  /**
   * Select Category Id from the dropdown
   * @param $event
   */
  onSelectChangeSubCategoryIdFromParent(event: any) {
    this.productSearchCriteria.subCategoryId = event?.value;
    this.loadProducts();
  }

  /**
   * Select the Sort by Quantity type
   * @param event
   */
  onSelectChangeSortQuantityFromParent(event: any) {
    this.productSearchCriteria.sortQuantity = event?.value;
    this.loadProducts();
  }

  /**
   * Filter the product by names
   * @param valueChanged
   */
  onValueChangesNameFromParent(valueChanged: any) {
    this.productSearchCriteria.search = valueChanged;
    this.loadProducts();
  }

  /**
   * Reset all filters and load the default products
   */
  onResetFilters() {
    this.subCategoriesDropdownRef.onClearSelection();
    this.goldsDropdownRef.onClearSelection();
    this.sortsCriteriaDropdownRef.onClearSelection();
    this.nameSearchInputRef.onClearInputFilter();
    this.productSearchCriteria.goldTypeId = undefined;
    this.productSearchCriteria.subCategoryId = undefined;
    this.productSearchCriteria.sortQuantity = undefined;
    this.loadProducts();
  }
}
