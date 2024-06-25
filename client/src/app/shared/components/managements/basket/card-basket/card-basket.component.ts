import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { BasketService } from '../../../../../core/services/basket/basket.service';
import { BasketModel } from '../../../../../core/models/basket.model';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CardBasketItemComponent } from '../card-basket-item/card-basket-item.component';
import { NotificationService } from '../../../../../core/services/notification/notification.service';

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
    CardBasketItemComponent,
  ],
})
export class CardBasketComponent implements OnInit {
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
  constructor(public basketService: BasketService) {}

  ngOnInit(): void {}
  // ======================
  // == Methods
  // ======================

  /**
   * Delete a basket based on id
   */
  onDeleteBasket() {
    this.basketService.deleteBasket(this.basket.id).subscribe({
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

  //
  public onGoToPayment() {
    console.log('Will go to payment');
  }
}
