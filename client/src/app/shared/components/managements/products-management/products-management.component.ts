import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  CategoryModel,
  ProductModel,
  ProductParams,
  ProductStatusEnum,
  SortProductsQuantityEnum,
  SubCategoryModel,
} from '../../../../core/models/product.model';
import { map, Observable } from 'rxjs';
import { DropdownModel } from '../../../../core/models/dropdown.model';
import { ProductService } from '../../../../core/services/product/product.service';
import { GenericTableDataSourceComponent } from '../../generic-table-data-source/generic-table-data-source.component';
import { Router } from '@angular/router';
import { GenericDropdownComponent } from '../../generic-dropdown/generic-dropdown.component';
import { MatIcon } from '@angular/material/icon';
import { NotificationService } from '../../../../core/services/notification/notification.service';

@Component({
  selector: 'app-products-management',
  standalone: true,
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.scss',
  imports: [GenericTableDataSourceComponent, GenericDropdownComponent, MatIcon],
})
export class ProductsManagementComponent implements OnInit {
  // ====================
  // == Fields
  // ====================
  public products$!: Observable<ProductModel[]>;
  columnsToDisplay = [
    'id',
    'name',
    'categoryName',
    'subCategoryName',
    'saleCounterName',
    'quantity',
    'productPrice',
    'status',
    'actions',
  ];

  public productParams: ProductParams = {
    pageSize: 10,
    pageIndex: 0,
    searchName: undefined,
    goldTypeId: undefined,
    subCategoryId: undefined,
    sortQuantity: undefined,
    categoryId: undefined,
    status: undefined,
  };
  public totalProducts: number = 0;
  public pageEvent!: PageEvent;
  public dataSource = new MatTableDataSource<ProductModel>([]);
  public categoriesDropdown!: DropdownModel[];
  public statusDropdown!: DropdownModel[];
  public subCategoriesDropdown!: DropdownModel[];
  public sortsQuantityDropdown!: DropdownModel[];

  @ViewChild('subCategoriesDropdownRef')
  subCategoriesDropdownRef!: GenericDropdownComponent;
  @ViewChild('categoriesDropdownRef')
  categoriesDropdownRef!: GenericDropdownComponent;
  @ViewChild('statusDropdownRef')
  statusDropdownRef!: GenericDropdownComponent;
  @ViewChild('sortsQuantityDropdownRef')
  sortsQuantityDropdownRef!: GenericDropdownComponent;

  // ====================
  // == Lifecycle
  // ====================
  constructor(
    private productService: ProductService,
    private route: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadSubCategoriesDropdown();
    this.loadCategoriesDropdown();
    this.loadStatusDropdown();
    this.loadSortQuantityDropdown();
  }

  // ====================
  // == Methods
  // ====================

  /**
   * Load products based on pagination
   */
  public loadProducts(): void {
    this.productService
      .getProducts({
        ...this.productParams,
        pageIndex: this.productParams.pageIndex + 1,
      })
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.data;
          this.dataSource._updateChangeSubscription();
          this.totalProducts = response.count;
        },
      });
  }

  /**
   * Load Sort quantity dropdown
   */
  public loadSortQuantityDropdown() {
    this.sortsQuantityDropdown = [
      {
        name: '↓ Số lượng: giảm dần',
        value: SortProductsQuantityEnum.QuantityDesc,
      },
      {
        name: '↑ Số lượng: tăng dần',
        value: SortProductsQuantityEnum.QuantityAsc,
      },
    ];
  }

  /**
   * Load all SubCategories, and map to the the key - value pair of * the dropdown component
   */
  public loadSubCategoriesDropdown() {
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
   * Load all SubCategories, and map to the the key - value pair of * the dropdown component
   */
  public loadCategoriesDropdown() {
    this.productService.getCategories().subscribe({
      next: (categories: CategoryModel[]) => {
        this.categoriesDropdown = categories.map((category) => {
          return { value: category.id, name: category.name };
        });
      },

      error(err) {
        console.error(err);
      },
    });
  }

  /**
   * Load all employee's statuses
   */
  public loadStatusDropdown() {
    this.statusDropdown = [
      {
        name: 'Đang bán',
        value: ProductStatusEnum.Available,
      },
      {
        name: 'Không còn bán',
        value: ProductStatusEnum.Unavailable,
      },
    ];
  }

  /**
   * Apply paginator on changing a page
   * @param event
   */
  public onPageChange(event: PageEvent) {
    this.productParams.pageIndex = event.pageIndex;
    this.productParams.pageSize = event.pageSize;
    this.loadProducts();
  }

  /**
   * Filtering the product name by the filter bar
   * @param event
   */
  public onValueChangesNameFromParent(event: Event) {
    const filteredValue = (event.target as HTMLInputElement)?.value;
    this.productParams.searchName = filteredValue;
    this.onResetPaginatorToFirstPage();
    this.loadProducts();
  }

  /**
   * Filter by Subcategory Id
   * @param event
   */
  public onSelectChangeSubCategoryIdFromParent(event: any) {
    this.productParams.subCategoryId = event?.value;
    this.onResetPaginatorToFirstPage();
    this.loadProducts();
  }

  /**
   * Filter by Category Id
   * @param event
   */
  public onSelectChangeCategoryIdFromParent(event: any) {
    this.productParams.categoryId = event?.value;
    this.onResetPaginatorToFirstPage();
    this.loadProducts();
  }

  /**
   * Filter by status
   * @param event
   */
  public onSelectChangeStatusFromParent(event: any) {
    this.productParams.status = event?.value;
    this.onResetPaginatorToFirstPage();
    this.loadProducts();
  }

  /**
   * Select the Sort by Quantity type
   * @param event
   */
  public onSelectChangeSortQuantityFromParent(event: any) {
    this.productParams.sortQuantity = event?.value;
    this.onResetPaginatorToFirstPage();
    this.loadProducts();
  }

  /**
   * Redirect to the product details by the path /products-management/1
   * @param $event
   */
  public onProductByIdFromParent($event: any) {
    const productId = $event;
    this.route.navigate([this.route.url + '/' + productId]);
  }

  /**
   * Disable the product status
   * @param product
   */
  public onDisableProduct(product: ProductModel) {
    this.productService.disableProduct(product.id).subscribe({
      next: (response: any) => {
        this.notificationService.show(
          `Disable Product ${product.name} successfully`
        );
        this.loadProducts();
      },
    });
  }

  /**
   * Edit Employee
   * @param product
   */
  public onEditProduct(product: ProductModel) {
    this.notificationService.show('Tính năng hiện đang bảo trì.');
  }

  /**
   * Reset paginator to the first page after filtering
   */
  public onResetPaginatorToFirstPage() {
    this.productParams.pageIndex = 0;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Reset all filters and load the default products
   */
  public onResetFilters() {
    this.subCategoriesDropdownRef.onClearSelection();
    this.categoriesDropdownRef.onClearSelection();
    this.sortsQuantityDropdownRef.onClearSelection();
    this.statusDropdownRef.onClearSelection();
    this.productParams.searchName = undefined;
    this.productParams.subCategoryId = undefined;
    this.productParams.categoryId = undefined;
    this.productParams.sortQuantity = undefined;
    this.loadProducts();
  }
}
