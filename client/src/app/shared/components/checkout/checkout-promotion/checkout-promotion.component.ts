import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  PromotionModel,
  PromotionsSearchingCriteriaModel as PromotionParams,
} from '../../../../core/models/promotion.model';
import { PromotionService } from '../../../../core/services/promotion/promotion.service';
import { catchError, map, Observable } from 'rxjs';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-checkout-promotion',
  standalone: true,
  imports: [
    MatPaginatorModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
  ],
  templateUrl: './checkout-promotion.component.html',
  styleUrl: './checkout-promotion.component.scss',
})
export class CheckoutPromotionComponent implements OnInit {
  // =========================
  // == Fields
  // =========================
  @Input() checkoutForm?: FormGroup;
  public promotions!: Observable<PromotionModel[]>;
  public promotionParams: PromotionParams = {
    pageSize: 4,
    pageIndex: 0,
    searchName: undefined,
  };
  public totalPromotions: number = 0;

  // =========================
  // == Lifecycle
  // =========================
  constructor(private promotionService: PromotionService) {}

  ngOnInit(): void {
    this.loadPromotions();
  }
  // =========================
  // == Methods
  // =========================

  /**
   * Apply paginator on changing a page
   * @param e
   */
  public onPageChange(e: PageEvent) {
    this.promotionParams.pageIndex = e.pageIndex;
    this.promotionParams.pageSize = e.pageSize;
    this.loadPromotions();
  }

  /**
   * Load promotions based on pagination
   */
  loadPromotions() {
    this.promotions = this.promotionService
      .getPromotions({
        ...this.promotionParams,
        pageIndex: this.promotionParams.pageIndex + 1,
      })
      .pipe(
        map((response: PaginationModel<PromotionModel>) => {
          this.promotionParams.pageIndex = response.pageIndex - 1;
          this.promotionParams.pageSize = response.pageSize;
          this.totalPromotions = response.count;
          return response.data;
        }),
        catchError((error) => {
          console.error('Error loading promotions', error);
          throw error;
        })
      );
  }
}