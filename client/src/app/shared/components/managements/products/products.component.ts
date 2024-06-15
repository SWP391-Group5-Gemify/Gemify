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
  SortProductsEnum,
  SubCategoryModel,
} from '../../../../core/models/product.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GenericDropdownComponent } from '../../generic-dropdown/generic-dropdown.component';
import { DropdownModel } from '../../../../core/models/dropdown.model';
import { GoldModel } from '../../../../core/models/gold.model';
import { GoldService } from '../../../../core/services/gold/gold.service';
import { CardProductComponent } from './card-product/card-product.component';
import EnumUtils from '../../../utils/EnumUtils';

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
    MatFormFieldModule,
    MatInputModule,
    GenericDropdownComponent,
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
    sort: undefined,
  };
  totalProducts: number = 0;
  pageEvent!: PageEvent;
  goldsDropdown!: DropdownModel[];
  subCategoriesDropdown!: DropdownModel[];
  sortsCriteriaDropdown!: DropdownModel[];

  @ViewChild('goldsDropdownRef') goldsDropdownRef!: GenericDropdownComponent;
  @ViewChild('subCategoriesDropdownRef')
  subCategoriesDropdownRef!: GenericDropdownComponent;
  @ViewChild('sortsCriteriaDropdownRef')
  sortsCriteriaDropdownRef!: GenericDropdownComponent;

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
            key: subCategory.id,
            value: subCategory.name,
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
          key: gold.id,
          value: gold.name,
        }));
      },

      error(err) {
        console.error(err);
      },
    });
  }

  loadSortsCriteria() {
    console.table(EnumUtils.enumToObject(SortProductsEnum));
  }

  /**
   * Select Gold Id from the dropdown
   * @param $event
   */
  onSelectChangeGoldIdFromParent($event: any) {
    const goldTypeId: string | number = $event;
    this.productSearchCriteria.goldTypeId = goldTypeId;
    this.loadProducts();
  }

  /**
   * Select Category Id from the dropdown
   * @param $event
   */
  onSelectChangeSubCategoryIdFromParent($event: any) {
    const subCategoryId: string | number = $event;
    this.productSearchCriteria.subCategoryId = subCategoryId;
    this.loadProducts();
  }

  /**
   * Reset all filters and load the default products
   */
  onResetFilters() {
    this.subCategoriesDropdownRef.onClearSelection();
    this.goldsDropdownRef.onClearSelection();
    this.productSearchCriteria.goldTypeId = undefined;
    this.productSearchCriteria.subCategoryId = undefined;
  }

  //TODO: Map the enum into the key-value pair, but key and value is the same
  onSelectChangeSortsCriteriaFromParent($event: any) {}
}
