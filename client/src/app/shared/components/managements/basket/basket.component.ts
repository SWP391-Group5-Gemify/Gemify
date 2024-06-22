import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GenericDropdownComponent } from '../../generic-dropdown/generic-dropdown.component';
import { GenericSearchComponent } from '../../generic-search/generic-search.component';
import { CardProductComponent } from '../products/card-product/card-product.component';
import { DropdownModel } from '../../../../core/models/dropdown.model';
import { HttpClient } from '@angular/common/http';
import { BasketService } from '../../../../core/services/basket/basket.service';
import {
  BasketItemModel,
  BasketModel,
  BasketsSearchingCriteriaModel,
} from '../../../../core/models/basket.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { filter, map, Observable, tap } from 'rxjs';
import { CardBasketComponent } from './card-basket/card-basket.component';
import { CardBasketItemComponent } from './card-basket-item/card-basket-item.component';

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
    CardBasketItemComponent,
  ],
})
export class BasketComponent implements OnInit {
  // ==========================================
  // == Fields
  // ==========================================
  public basketIdAndPhoneDropdown!: DropdownModel[];
  public baskets$!: Observable<BasketModel[]>;
  public basketSearchCriteria: BasketsSearchingCriteriaModel = {
    id: undefined,
    searchPhoneNumber: undefined,
  };

  @ViewChild('phoneSearchInputRef')
  phoneSearchInputRef!: GenericSearchComponent;
  @ViewChild('basketIdAndPhoneDropdownRef')
  basketIdAndPhoneDropdownRef!: GenericDropdownComponent;

  // ==========================================
  // == Life Cycle
  // ==========================================
  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.loadBaskets();
    this.loadBasketIdAndPhoneDropdown();
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
        console.table(baskets);
        let filteredBaskets = baskets;

        // filter on id
        if (this.basketSearchCriteria.id) {
          filteredBaskets = filteredBaskets.filter(
            (basket) => basket.id === this.basketSearchCriteria.id
          );
        }

        // If the phone number is not null, then filter it on phone number
        if (this.basketSearchCriteria.searchPhoneNumber) {
          filteredBaskets = filteredBaskets.filter(
            (basket) =>
              basket.phoneNumber &&
              basket.phoneNumber.includes(
                this.basketSearchCriteria.searchPhoneNumber!
              )
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
    this.basketService.getBaskets().subscribe((baskets: BasketModel[]) => {
      this.basketIdAndPhoneDropdown = baskets.map((basket) => ({
        value: basket.id,
        name: this.basketService.generateTempTicketId(
          basket.id,
          basket.phoneNumber
        ),
      }));
    });
  }

  /**
   * Handles selection change in basket ID and phone number dropdown.
   * Updates search criteria and reloads baskets.
   * @param event$ Event containing selected value.
   */
  public onSelectChangeBasketIdAndPhoneFromParent(event: any) {
    this.basketSearchCriteria.id = event?.value;
    this.loadBaskets();
  }

  /**
   * Handles value changes in the phone number search input.
   * Updates search criteria and reloads baskets.
   * @param valueChanged New value entered in the search input.
   */
  public onValueChangesPhoneFromParent(valueChanged: any) {
    this.basketSearchCriteria.searchPhoneNumber = valueChanged;
    this.loadBaskets();
  }

  /**
   * Placeholder method for resetting filters.
   * Currently not implemented.
   */
  public onResetFilters() {
    this.basketIdAndPhoneDropdownRef.onClearSelection();
    this.phoneSearchInputRef.onClearInputFilter();
    this.basketSearchCriteria.id = undefined;
    this.basketSearchCriteria.searchPhoneNumber = undefined;
    this.loadBaskets();
  }
}
