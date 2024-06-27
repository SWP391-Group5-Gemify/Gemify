import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BasketService } from '../../../../../core/services/basket/basket.service';
import {
  BasketItemModel,
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

  @Input() basketItems: any;
  public displayedColumns: string[] = [
    'pictureUrl',
    'productName',
    'quantity',
    'price',
    'remove',
  ];

  // ======================
  // == Constructors
  // ======================

  // ======================
  // == Methods
  // ======================
}
