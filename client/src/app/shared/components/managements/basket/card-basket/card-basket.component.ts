import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { BasketService } from '../../../../../core/services/basket/basket.service';
import { BasketModel } from '../../../../../core/models/basket.model';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TableBasketItemsComponent } from '../table-basket-items/table-basket-items.component';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { RoleEnum } from '../../../../../core/models/role.model';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OrderTypeEnum } from '../../../../../core/models/order.model';

@UntilDestroy()
@Component({
  selector: 'app-card-basket',
  standalone: true,
  templateUrl: './card-basket.component.html',
  styleUrl: './card-basket.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatExpansionModule,
    CommonModule,
    MatIcon,
    MatButtonModule,
    TableBasketItemsComponent,
  ],
})
export class CardBasketComponent {
  // ======================
  // == Fields
  // ======================
  public readonly panelOpenState = signal(false);
  @Input() public basket!: BasketModel;
  @Output() onDeleteBasketFromChild: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  // ======================
  // == Lifecycle
  // ======================
  constructor(
    public basketService: BasketService,
    public authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  // ======================
  // == Methods
  // ======================

  /**
   * Delete a basket based on id
   */
  onDeleteBasket() {
    this.basketService
      .deleteBasket(this.basket.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response) => {
          if (response) {
            this.onDeleteBasketFromChild.emit(true);
          }
        },

        error: (err) => {
          this.onDeleteBasketFromChild.emit(false);
          console.error(err);
        },
      });
  }

  /**
   * Check if the current user is the Cashier or not
   * @returns
   */
  isUserCashier() {
    return this.authService.currentUser()?.role === RoleEnum.Cashier;
  }

  /**
   * Set the current basket for checkout
   * Go to checkout page
   */
  public onGoToCheckOutPage() {
    this.basketService.selectBasketBeCurrentBasket(this.basket);

    switch (this.basket.orderTypeId) {
      case OrderTypeEnum.SELL: {
        this.router.navigate(['/cashier/checkout']);
        return;
      }
      case OrderTypeEnum.BUYBACK: {
        this.router.navigate(['/cashier/checkout-ex-bb']);
        return;
      }
      case OrderTypeEnum.EXCHANGE: {
        this.router.navigate(['/cashier/checkout-ex-bb']);
        return;
      }
    }
  }
}
