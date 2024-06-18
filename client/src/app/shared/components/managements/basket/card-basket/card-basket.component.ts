import { Component, Input, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { BasketService } from '../../../../../core/services/basket/basket.service';
import { BasketModel } from '../../../../../core/models/basket.model';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card-basket',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, MatIcon, MatButtonModule],
  templateUrl: './card-basket.component.html',
  styleUrl: './card-basket.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBasketComponent implements OnInit {
  // ======================
  // == Fields
  // ======================
  public readonly panelOpenState = signal(false);
  @Input() public basketItem!: BasketModel;

  // ======================
  // == Lifecycle
  // ======================
  constructor(private basketService: BasketService) {}

  ngOnInit(): void {}
  // ======================
  // == Methods
  // ======================
}
