import { Component, OnInit } from '@angular/core';
import {
  GoldModel,
  GoldPricesModel,
  UpdateGoldPricesModel,
} from '../../../../core/models/gold.model';
import { GoldService } from '../../../../core/services/gold/gold.service';
import { DropdownModel } from '../../../../core/models/dropdown.model';
import { forkJoin } from 'rxjs';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericDropdownComponent } from '../../generic-dropdown/generic-dropdown.component';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-gold-bid-ask',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    GenericDropdownComponent,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './gold-bid-ask.component.html',
  styleUrl: './gold-bid-ask.component.scss',
})
export class GoldBidAskComponent implements OnInit {
  // ====================
  // == Fields
  // ====================
  goldTypes: GoldModel[] = [];
  goldsDropdown!: DropdownModel[];
  currentGoldPrice?: number;
  selectedGold?: GoldModel;
  goldPrice?: UpdateGoldPricesModel;

  pattern = /^\d+$/;

  goldPriceForm = this.formBuilder.group({
    bidPrice: [
      '',
      [Validators.required, Validators.pattern(this.pattern)],
    ],
    askPrice: [
      '',
      [Validators.required, Validators.pattern(this.pattern)],
    ],
  });
  // ====================
  // == Lifecycle
  // ====================
  constructor(
    private goldService: GoldService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadGoldsDropdown();
  }
  // ====================
  // == Methods
  // ====================

  /**
   * Load GoldTypes
   * - Map response with page field
   * - Return the Observable<GoldModel[]>
   */
  public loadGoldsDropdown() {
    this.goldService
      .getAllGolds()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response: PaginationModel<GoldModel>) => {
          this.goldTypes = response.data;
          this.goldsDropdown = response.data.map((gold) => ({
            value: gold.id,
            name: gold.name,
          }));
        },
        error(err) {
          console.error(err);
        },
      });
  }

  /**
   * Get world gold price from API
   * USD -> VND
   * 1 ounce = 8.29 chi (Vietnamese unit for gold)
   */
  public getWorldGoldPrice() {
    forkJoin([
      this.goldService.getWorldGoldPrice(),
      this.goldService.getCurrency(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe({
        next: ([goldPrice, currency]) => {
          this.currentGoldPrice = Math.round(
            (goldPrice.price * currency.data.VND.value) / 8.29
          );
        },
        error: (error) => console.log(error),
      });
  }

  /**
   * Choosing gold type on dropdown
   * Get the gold purity
   * @param event
   */
  onSelectionChangeGoldTypeFromParent(event: any) {
    const gold = this.goldTypes.find((gold) => gold.id == event.value);
    if (gold) {
      this.selectedGold = gold;
    }
  }

  /**
   * Reset form fields and all calculation, also get latest gold price from the API
   */
  onReset() {
    this.getWorldGoldPrice();
    this.goldPriceForm.reset();
  }

  /**
   * Update the gold bid/ask price of the chosen gold type
   */
  onSubmit() {
    if (
      this.goldPriceForm.valid &&
      this.selectedGold
    ) {
        const goldTypeId = this.selectedGold.id;
        this.goldPrice = {
          goldTypeId: goldTypeId,
          bidPrice: Number(this.goldPriceForm.get('bidPrice')!.value),
          askPrice: Number(this.goldPriceForm.get('askPrice')!.value),
        };

        this.goldService
          .updateBidAskGoldPrice(goldTypeId, this.goldPrice)
          .pipe(untilDestroyed(this))
          .subscribe({
            next: (response: any) => {
              this.notificationService.show(
                `Cập nhật vàng ${this.selectedGold?.name} thành công`
              );
            },

            error: (err) => {
              console.error(err);
              this.notificationService.show(
                'Có lỗi xảy ra trong quá trình cập nhật',
                'Thử lại',
                5000
              );
            },
          });

          // Refresh selected gold after update
          var gold = this.goldTypes
          .find((gold) => gold.id == this.selectedGold?.id);

          gold!.latestAskPrice = Number(this.goldPriceForm.get('askPrice')!.value);
          gold!.latestBidPrice = Number(this.goldPriceForm.get('bidPrice')!.value);

          this.selectedGold = gold;
    }
  }

  // Checking if the input is valid or not for mat-errors
  updateErrorMessage(controlName: string): string {
    const control = this.goldPriceForm.get(controlName);
    let errorMessage: string = '';

    switch (true) {
      case control?.hasError('required'):
        errorMessage = 'Bạn phải nhập trường này';
        break;
      case control?.hasError('pattern'):
        if (controlName === 'bidPrice') {
          errorMessage = 'Giá bán phải là số';
        } else if (controlName === 'askPrice') {
          errorMessage = 'Giá mua phải là số';
        }
        break;
    }
    return errorMessage;
  }
}
