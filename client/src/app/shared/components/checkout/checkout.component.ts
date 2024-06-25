import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../../core/services/basket/basket.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  constructor(public basketService: BasketService) {}
  ngOnInit(): void {
    // Load submitted basket
    this.basketService.basketSource$.subscribe({
      next(value) {
        console.table(value);
      },
    });
  }
}
