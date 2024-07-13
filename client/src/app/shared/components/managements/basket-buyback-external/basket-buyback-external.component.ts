import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DropdownModel } from '../../../../core/models/dropdown.model';
import { GenericDropdownComponent } from '../../generic-dropdown/generic-dropdown.component';
import { GoldService } from '../../../../core/services/gold/gold.service';
import { ProductService } from '../../../../core/services/product/product.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs';
import { SubCategoryModel } from '../../../../core/models/product.model';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { GoldModel } from '../../../../core/models/gold.model';
import ImageUtils from '../../../utils/ImageUtils';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../../../core/services/basket/basket.service';
import { OrderTypeEnum } from '../../../../core/models/order.model';
import { BasketItemBuybackModel } from '../../../../core/models/basket.model';
import { NotificationService } from '../../../../core/services/notification/notification.service';

@UntilDestroy()
@Component({
  selector: 'app-basket-buyback-external',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    GenericDropdownComponent,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './basket-buyback-external.component.html',
  styleUrl: './basket-buyback-external.component.scss',
})
export class BasketBuybackExternalComponent implements OnInit {
  // =========================
  // == Fields
  // =========================
  private staticImageFile: string = ImageUtils.concatLinkToTokenFirebase(
    'https://firebasestorage.googleapis.com/v0/b/gemify-d7e93.appspot.com/o/images%2Fproducts%2Fnhan-18K.png'
  );

  public buyBackProductForm!: FormGroup;
  public subCategoriesDropdown!: DropdownModel[];
  public goldsDropdown!: DropdownModel[];
  basketItem = new BasketItemBuybackModel();

  @ViewChild('goldsDropdownRef') goldsDropdownRef!: GenericDropdownComponent;
  @ViewChild('subCategoriesDropdownRef')
  subCategoriesDropdownRef!: GenericDropdownComponent;
  // =========================
  // == Life cycle
  // =========================
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private goldService: GoldService,
    private basketService: BasketService,
    private notificationService: NotificationService
  ) {
    this.buyBackProductForm = this.fb.group({
      productName: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      goldWeight: [0, [Validators.required, Validators.min(0)]],
      phoneNumber: ['', [Validators.required, Validators.min(0)]],
    });
  }
  ngOnInit(): void {
    this.loadSubCategoriesDropdown();
    this.loadGoldsDropdown();
  }

  // =========================
  // == Methods
  // =========================

  /**
   * Load all Subcategories
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
    const goldTypeId = event?.value;
    this.basketItem.goldTypeId = goldTypeId;
  }

  /**
   * Select Category Id from the dropdown
   * @param $event
   */
  public onSelectChangeSubCategoryIdFromParent(event: any) {
    const subCategoryId = event?.value;
    this.basketItem.subCategoryId = subCategoryId;
  }

  onCreateExternalBuyBackBasket() {
    const phoneNumber = this.buyBackProductForm.get('phoneNumber')?.value;

    // Create empty basket
    let basket = this.basketService.createEmptyBasketWithPhoneNumber(
      phoneNumber,
      OrderTypeEnum.BUYBACK
    );

    basket.phoneNumber = phoneNumber;

    // Basket Item
    this.basketItem.pictureUrl = this.staticImageFile;
    this.basketItem.productName =
      this.buyBackProductForm.get('productName')!.value;
    this.basketItem.quantity = this.buyBackProductForm.get('quantity')!.value;
    this.basketItem.price = this.buyBackProductForm.get('price')!.value;
    this.basketItem.goldWeight =
      this.buyBackProductForm.get('goldWeight')!.value;

    basket.buybackItems.push(this.basketItem);
    this.basketService.setOrUpdateBasket(basket);
    this.notificationService.show('Create empty basket successfully');
  }
}
