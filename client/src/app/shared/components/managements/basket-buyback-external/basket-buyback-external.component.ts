import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
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
import { map, Observable } from 'rxjs';
import { SubCategoryModel } from '../../../../core/models/product.model';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { GoldModel } from '../../../../core/models/gold.model';
import ImageUtils from '../../../utils/ImageUtils';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BasketService } from '../../../../core/services/basket/basket.service';
import { BasketModel } from '../../../../core/models/basket.model';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { ModalCreateNewBasketComponent } from '../products/modal-create-new-basket/modal-create-new-basket.component';
import { MatDialog } from '@angular/material/dialog';

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

  // private staticImageFile: string = ImageUtils.concatLinkToTokenFirebase(
  //   'https://firebasestorage.googleapis.com/v0/b/gemify-d7e93.appspot.com/o/images%2Fproducts%2Fnhan-18K.png'
  // );

  public buyBackProductForm!: FormGroup;
  public subCategoriesDropdown!: DropdownModel[];
  public goldsDropdown!: DropdownModel[];
  public basketIdAndPhoneDropdown$!: Observable<DropdownModel[] | []>;

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
    public basketService: BasketService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.buyBackProductForm = this.fb.group({
      productName: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      goldWeight: [0, [Validators.required, Validators.min(0)]],
      phoneNumber: ['', [Validators.required, Validators.min(0)]],
      gems: this.fb.array([]), // Form array of gems
    });
  }
  ngOnInit(): void {
    this.loadSubCategoriesDropdown();
    this.loadGoldsDropdown();
    this.loadBasketIdAndPhoneDropdown();
  }

  // =========================
  // == Methods
  // =========================
  /**
   * Prevent use input "ENTER" key for exiting
   * @param event
   */
  public preventEnterKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

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
   * TODO: Add product outdoor to the outdoor basket
   * @param $event
   */
  public onSelectChangeGoldIdFromParent(event: any) {
    const goldTypeId = event?.value;
  }

  /**
   * Select Category Id from the dropdown
   *  * TODO: Add product outdoor to the outdoor basket
   * @param $event
   */
  public onSelectChangeSubCategoryIdFromParent(event: any) {
    const subCategoryId = event?.value;
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
  // public getCountTotalItemsAddedInToBasketSource(items: BasketItemSellModel[]) {
  //   return items.reduce((acc, curr) => {
  //     return acc + curr.quantity;
  //   }, 0);
  // }

  /**
   * On create external buyback with basket
   */
  public onOpenModalAndCreateOutDoorBuybackBasketWithCustomerPhone() {
    const dialogRef = this.dialog.open(ModalCreateNewBasketComponent, {
      width: '30rem',
      height: '30rem',
      disableClose: true,
    });

    // // Create empty basket
    // let basket = this.basketService.createEmptyBasketWithPhoneNumber(
    //   phoneNumber,
    //   OrderTypeEnum.BUYBACK
    // );

    // // Basket Item
    // this.basketItem.pictureUrl = this.staticImageFile;
    // this.basketItem.productName =
    //   this.buyBackProductForm.get('productName')!.value;
    // this.basketItem.quantity = this.buyBackProductForm.get('quantity')!.value;
    // this.basketItem.goldWeight =
    //   this.buyBackProductForm.get('goldWeight')!.value;

    // basket.buybackItems.push(this.basketItem);
    // this.basketService.setOrUpdateBasket(basket);
    // this.notificationService.show('Create empty basket successfully');
  }
}
