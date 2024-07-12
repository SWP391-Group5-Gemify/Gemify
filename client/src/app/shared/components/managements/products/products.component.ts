import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { catchError, combineLatest, map, mergeMap, Observable } from 'rxjs';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { ProductService } from '../../../../core/services/product/product.service';
import {
  ProductModel,
  ProductParams,
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
import { NgxSpinnerModule } from 'ngx-spinner';
import { BasketService } from '../../../../core/services/basket/basket.service';
import {
  BasketItemSellModel,
  BasketModel,
} from '../../../../core/models/basket.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateNewBasketComponent } from './modal-create-new-basket/modal-create-new-basket.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OrderTypeEnum } from '../../../../core/models/order.model';
import { BarcodeScannerComponent } from '../../../../barcode-scanner/barcode-scanner.component';

@UntilDestroy()
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
    GenericDropdownComponent,
    GenericSearchComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  // ==========================================
  // == Fields
  // ==========================================
  public products$!: Observable<ProductModel[]>;
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
  public goldsDropdown!: DropdownModel[];
  public subCategoriesDropdown!: DropdownModel[];
  public sortsQuantityDropdown: DropdownModel[] = [
    {
      name: '↓ Số lượng: giảm dần',
      value: SortProductsQuantityEnum.QuantityDesc,
    },
    {
      name: '↑ Số lượng: tăng dần',
      value: SortProductsQuantityEnum.QuantityAsc,
    },
  ];
  public basketIdAndPhoneDropdown$!: Observable<DropdownModel[] | []>;

  @ViewChild('goldsDropdownRef') goldsDropdownRef!: GenericDropdownComponent;
  @ViewChild('subCategoriesDropdownRef')
  subCategoriesDropdownRef!: GenericDropdownComponent;
  @ViewChild('sortsQuantityDropdownRef')
  sortsQuantityDropdownRef!: GenericDropdownComponent;
  @ViewChild('nameSearchInputRef') nameSearchInputRef!: GenericSearchComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ====================
  // == Life Cycle
  // ====================
  constructor(
    private productService: ProductService,
    private goldService: GoldService,
    public basketService: BasketService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadSubCategoriesDropdown();
    this.loadGoldsDropdown();
    this.loadBasketIdAndPhoneDropdown();
  }

  // ====================
  // == Methods
  // ====================

  // ========================================== Filters, Pagination, Reset =============================

  /**
   * Apply paginator on changing a page
   * @param e
   */
  public onPageChange(e: PageEvent) {
    this.productParams.pageIndex = e.pageIndex;
    this.productParams.pageSize = e.pageSize;
    this.loadProducts();
  }

  /**
   * Load products based on pagination
   */
  public loadProducts() {
    this.products$ = this.productService
      .getProducts({
        ...this.productParams,
        pageIndex: this.productParams.pageIndex + 1,
      })
      .pipe(
        map((response: PaginationModel<ProductModel>) => {
          this.productParams.pageIndex = response.pageIndex - 1;
          this.productParams.pageSize = response.pageSize;
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
  public loadSubCategoriesDropdown() {
    this.productService
      .getSubCategories()
      .pipe(
        untilDestroyed(this),
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
   *
   * TODO: Handle error when load failed
   */
  public loadGoldsDropdown() {
    this.goldService
      .getAllGolds()
      .pipe(untilDestroyed(this))
      .subscribe({
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
  public onSelectChangeGoldIdFromParent(event: any) {
    this.productParams.goldTypeId = event?.value;
    this.onResetPaginatorToFirstPage();
    this.loadProducts();
  }

  /**
   * Select Category Id from the dropdown
   * @param $event
   */
  public onSelectChangeSubCategoryIdFromParent(event: any) {
    this.productParams.subCategoryId = event?.value;
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
   * Filter the product by names
   * @param valueChanged
   */
  public onValueChangesNameFromParent(valueChanged: any) {
    this.productParams.searchName = valueChanged;
    this.onResetPaginatorToFirstPage();
    this.loadProducts();
  }

  /**
   * Reset all filters and load the default products
   */
  public onResetFilters() {
    this.subCategoriesDropdownRef.onClearSelection();
    this.goldsDropdownRef.onClearSelection();
    this.sortsQuantityDropdownRef.onClearSelection();
    this.nameSearchInputRef.onClearInputFilter();
    this.productParams.goldTypeId = undefined;
    this.productParams.subCategoryId = undefined;
    this.productParams.sortQuantity = undefined;
    this.loadProducts();
  }

  /**
   * Reset paginator to the first page after filtering
   */
  public onResetPaginatorToFirstPage() {
    this.productParams.pageIndex = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  // ========================================== BASKET SOURCE =============================

  /**
   * Loads the dropdown options for basket ID and phone number.
   * Maps baskets to dropdown model.
   */
  public loadBasketIdAndPhoneDropdown() {
    this.basketIdAndPhoneDropdown$ = this.basketService.getBaskets().pipe(
      map((baskets: BasketModel[]) => {
        return baskets.map((basket: BasketModel) => ({
          value: basket.id,
          name: this.basketService.generateTempTicketId(basket),
        }));
      })
    );
  }

  /**
   * Handles selection change in basket ID and phone number dropdown.
   * Update the current basket source for adding new item into it.
   * TODO: Current cannot assign the current dropdown value when selecting a basket, just reloading a list
   * @param event$ Event containing selected value.
   */
  public onSelectChangeBasketIdAndPhoneFromParent(event: any) {
    const selectedBasketId = event?.value;

    if (selectedBasketId) {
      this.basketService.loadBasketById(selectedBasketId);
    }
  }

  /**
   * Reduce the unique items into total of items in 1 basket
   * @param items
   * @returns
   */
  public getCountTotalItemsAddedInToBasketSource(items: BasketItemSellModel[]) {
    return items.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0);
  }

  /**
   * Create new modal, adding customer phone and create new basket
   */
  public onOpenModalAndCreateBasketWithCustomerPhone() {
    const dialogRef = this.dialog.open(ModalCreateNewBasketComponent, {
      width: '30rem',
      height: '30rem',
      disableClose: true,
    });

    dialogRef
      .beforeClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result) {
          this.basketService.createEmptyBasketWithPhoneNumber(
            result.phoneNumber,
            OrderTypeEnum.SELL
          );

          // Reload the basket dropdown for new added basket
          this.loadBasketIdAndPhoneDropdown();
        }
      });
  }
}
