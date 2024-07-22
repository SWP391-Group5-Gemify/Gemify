import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GenericDropdownComponent } from '../../generic-dropdown/generic-dropdown.component';
import { GenericSearchComponent } from '../../generic-search/generic-search.component';
import { DropdownModel } from '../../../../core/models/dropdown.model';
import { BasketService } from '../../../../core/services/basket/basket.service';
import {
  BasketModel,
  BasketParams as BasketsParams,
} from '../../../../core/models/basket.model';
import { MatTableModule } from '@angular/material/table';
import { map, Observable } from 'rxjs';
import { CardBasketComponent } from './card-basket/card-basket.component';
import { TableBasketItemsComponent } from './table-basket-items/table-basket-items.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDividerModule } from '@angular/material/divider';
import { OrderService } from '../../../../core/services/order/order.service';
import { OrderTypeModel } from '../../../../core/models/order.model';

@UntilDestroy()
@Component({
  selector: 'app-basket',
  standalone: true,
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIcon,
    MatPaginatorModule,
    GenericDropdownComponent,
    GenericSearchComponent,
    MatButtonModule,
    MatTableModule,
    CardBasketComponent,
    TableBasketItemsComponent,
    MatDividerModule,
  ],
})
export class BasketComponent implements OnInit {
  // ==========================================
  // == Fields
  // ==========================================
  public basketIdAndPhoneDropdown!: DropdownModel[];
  public orderTypeDropdown!: DropdownModel[];
  public baskets$!: Observable<BasketModel[]>;
  public basketsParams: BasketsParams = {
    id: undefined,
    searchPhoneNumber: undefined,
    orderTypeId: undefined,
  };

  @ViewChild('phoneSearchInputRef')
  phoneSearchInputRef!: GenericSearchComponent;
  @ViewChild('basketIdAndPhoneDropdownRef')
  basketIdAndPhoneDropdownRef!: GenericDropdownComponent;
  @ViewChild('orderTypeDropdownRef')
  orderTypeDropdownRef!: GenericDropdownComponent;

  // ==========================================
  // == Life Cycle
  // ==========================================
  constructor(
    private basketService: BasketService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadBaskets();
    this.loadBasketIdAndPhoneDropdown();
    this.loadOrderTypesDropdown();
  }

  // ==========================================
  // == Methods
  // ==========================================

  /**
   * Load all baskets from the redis combines with filters
   */
  public loadBaskets() {
    // Since the GET don't have any params, I have to call GET all and GET by ID api to achive the dropdown and filter
    this.baskets$ = this.basketService.getBaskets().pipe(
      map((baskets: BasketModel[]) => {
        let filteredBaskets = baskets;

        // filter on id
        if (this.basketsParams.id) {
          filteredBaskets = filteredBaskets.filter(
            (basket) => basket.id === this.basketsParams.id
          );
        }

        // If the phone number is not null, then filter it on phone number
        if (this.basketsParams.searchPhoneNumber) {
          filteredBaskets = filteredBaskets.filter(
            (basket) =>
              basket.phoneNumber &&
              basket.phoneNumber.includes(this.basketsParams.searchPhoneNumber!)
          );
        }

        // If the phone number is not null, then filter it on phone number
        if (this.basketsParams.orderTypeId) {
          filteredBaskets = filteredBaskets.filter(
            (basket) => basket.orderTypeId === this.basketsParams.orderTypeId
          );
        }

        return filteredBaskets;
      })
    );
  }

  /**
   * Loads the dropdown options for basket ID and phone number.
   * Maps baskets to dropdown model.
   */
  public loadBasketIdAndPhoneDropdown() {
    this.basketService
      .getBaskets()
      .pipe(untilDestroyed(this))
      .subscribe((baskets: BasketModel[]) => {
        this.basketIdAndPhoneDropdown = baskets.map((basket) => ({
          value: basket.id,
          name: this.basketService.generateTempTicketId(basket),
        }));
      });
  }

  /**
   * Loads the dropdown options for Order Type.
   * Maps baskets to dropdown model.
   */
  public loadOrderTypesDropdown() {
    this.orderService
      .getOrderTypes()
      .pipe(untilDestroyed(this))
      .subscribe((orderTypes: OrderTypeModel[]) => {
        this.orderTypeDropdown = orderTypes.map((orderType) => ({
          value: orderType.id,
          name: orderType.name,
        }));
      });
  }

  /**
   * Handles selection change in basket ID and phone number dropdown.
   * Updates search criteria and reloads baskets.
   * @param event$ Event containing selected value.
   */
  public onSelectChangeBasketIdAndPhoneFromParent(event: any) {
    this.basketsParams.id = event?.value;
    this.loadBaskets();
  }

  /**
   * Handles selection change in basket ID and phone number dropdown.
   * Updates search criteria and reloads baskets.
   * @param event$ Event containing selected value.
   */
  public onSelectChangeOrderTypesFromParent(event: any) {
    this.basketsParams.orderTypeId = event?.value;
    this.loadBaskets();
  }

  /**
   * Handles value changes in the phone number search input.
   * Updates search criteria and reloads baskets.
   * @param valueChanged New value entered in the search input.
   */
  public onValueChangesPhoneFromParent(valueChanged: any) {
    this.basketsParams.searchPhoneNumber = valueChanged;
    this.loadBaskets();
  }

  /**
   * Placeholder method for resetting filters.
   * Currently not implemented.
   */
  public onResetFilters() {
    this.basketIdAndPhoneDropdownRef.onClearSelection();
    this.phoneSearchInputRef.onClearInputFilter();
    this.orderTypeDropdownRef.onClearSelection();
    this.basketsParams.id = undefined;
    this.basketsParams.searchPhoneNumber = undefined;
    this.basketsParams.orderTypeId = undefined;
    this.loadBaskets();
  }

  /**
   * if the delete basket event from children success, then reload the baskets list
   * @param success
   */
  public onBasketDeletedFromParent(success: boolean) {
    if (success) {
      this.loadBaskets();
      this.loadBasketIdAndPhoneDropdown();
    }
  }
}
