import { Component, inject, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BasketService } from '../../../../../core/services/basket/basket.service';
import {
  BasketItemSellModel,
  BasketModel,
} from '../../../../../core/models/basket.model';

@Component({
  selector: 'app-table-basket-items',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './table-basket-items.component.html',
  styleUrl: './table-basket-items.component.scss',
})
export class TableBasketItemsComponent {
  // ======================
  // == Fields
  // ======================
  basketService = inject(BasketService);

  @Input() basketItems: any;
  public displayedColumns: string[] = [
    'pictureUrl',
    'productName',
    'quantity',
    'price',
  ];

  // ======================
  // == Constructors
  // ======================

  // ======================
  // == Methods
  // ======================
}
