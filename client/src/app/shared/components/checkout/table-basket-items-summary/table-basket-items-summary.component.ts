import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BasketItemSellModel } from '../../../../core/models/basket.model';

@Component({
  selector: 'app-table-basket-items-summary',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './table-basket-items-summary.component.html',
  styleUrl: './table-basket-items-summary.component.scss',
})
export class TableBasketItemsSummaryComponent {
  // ======================
  // == Fields
  // ======================
  @Input() basketItems: any;
  public displayedColumns: string[] = [
    'pictureUrl',
    'productName',
    'quantity',
    'price',
    'total',
  ];

  // ======================
  // == Methods
  // ======================

  /**
   * Quantity * Price per item
   * @param item
   * @returns
   */
  public calculatePerItemTotalPrice(item: BasketItemSellModel): number {
    return item.price * item.quantity;
  }
}
