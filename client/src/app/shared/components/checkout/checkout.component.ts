import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../../core/services/basket/basket.service';
import { CommonModule, Location } from '@angular/common';
import { BasketItemModel } from '../../../core/models/basket.model';
import { TableBasketItemsComponent } from '../managements/basket/table-basket-items/table-basket-items.component';
import { TableBasketItemsSummaryComponent } from './table-basket-items-summary/table-basket-items-summary.component';
import { MatIconModule } from '@angular/material/icon';
import { GenericStepperComponent } from '../generic-stepper/generic-stepper.component';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  imports: [
    CommonModule,
    TableBasketItemsSummaryComponent,
    MatIconModule,
    GenericStepperComponent,
    CdkStepperModule,
  ],
})
export class CheckoutComponent {
  // ======================
  // == Fields
  // ======================

  // ======================
  // == Lifecycle
  // ======================
  constructor(
    public basketService: BasketService,
    private location: Location
  ) {}

  // ======================
  // == Methods
  // ======================

  /**
   * Total Price of the Basket
   * @param items
   * @returns
   */
  public calculateBasketTotalPrice(items: BasketItemModel[]): number {
    return items.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  }

  /**
   * Go back to the baskets page
   */
  public onGoBackToBasketsPage() {
    this.location.back();
  }
}
