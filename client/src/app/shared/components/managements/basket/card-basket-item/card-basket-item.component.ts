import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card-basket-item',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './card-basket-item.component.html',
  styleUrl: './card-basket-item.component.scss',
})
export class CardBasketItemComponent {
  @Input() basketItems: any;
  public displayedColumns: string[] = [
    'pictureUrl',
    'productName',
    'quantity',
    'price',
  ];
}
