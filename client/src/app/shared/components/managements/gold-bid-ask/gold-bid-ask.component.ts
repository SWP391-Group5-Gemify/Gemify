import { Component, OnInit } from '@angular/core';
import { GoldModel, GoldPricesModel, UpdateGoldPricesModel } from '../../../../core/models/gold.model';
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
    MatDividerModule
  ],
  templateUrl: './gold-bid-ask.component.html',
  styleUrl: './gold-bid-ask.component.scss',
})
export class GoldBidAskComponent implements OnInit{
  goldTypes: GoldModel[] = [];
  goldsDropdown!: DropdownModel[];
  currentGoldPrice?: number = 50000000;
  newBidPrice?: number = 400000;
  newAskPrice?: number = 399999;
  goldPurity: number = 1;
  selectedGold?: GoldModel;
  goldPrice?: UpdateGoldPricesModel;

  decimalPattern = /^\d+(\.\d+)?$/;

  goldRateForm = this.formBuilder.group({
    bidRate: ['', [Validators.required, Validators.pattern(this.decimalPattern)]],
    askRate: ['', [Validators.required, Validators.pattern(this.decimalPattern)]]
  });

  constructor(
    private goldService: GoldService, 
    private formBuilder: FormBuilder, 
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.loadGoldsDropdown();
  }

  /**
   * Load GoldTypes
   * - Map response with page field
   * - Return the Observable<GoldModel[]>
   */
  public loadGoldsDropdown() {
    this.goldService.getAllGolds().subscribe({
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
    forkJoin([this.goldService.getWorldGoldPrice(), this.goldService.getCurrency()]).subscribe({
      next: ([goldPrice, currency]) => {
        this.currentGoldPrice = Math.round((goldPrice.price * currency.data.VND.value)/8.29);
      },
      error: error => console.log(error)
    })
  }

  /**
   * Choosing gold type on dropdown
   * Get the gold purity
   * @param event
   */
  onSelectionChangeRoleNameFromParent(event: any) {
     const gold = this.goldTypes.find(gold => gold.id == event.value)
     if (gold) {
      this.selectedGold = gold;
      if (this.currentGoldPrice) 
        this.goldPurity = gold.content/100;
     }
  }

  calculateGoldPrice() {
    if(this.goldRateForm.valid) {
      const bidRate = Number(this.goldRateForm.get('bidRate')!.value);
      const askRate = Number(this.goldRateForm.get('askRate')!.value);

      if(this.currentGoldPrice) {
        this.newBidPrice = this.currentGoldPrice * bidRate * this.goldPurity;
        this.newAskPrice = this.currentGoldPrice * askRate * this.goldPurity;
      }  
    }
  }

  onReset() {
    this.getWorldGoldPrice();
    this.newBidPrice = undefined;
    this.newAskPrice = undefined;
    this.goldPurity = 1;
    this.selectedGold = undefined;
    this.goldRateForm.reset();
  }

  onSubmit() {
    if(this.goldRateForm.valid && this.selectedGold && this.newBidPrice && this.newAskPrice) {
      this.goldPrice = {
        goldTypeId: this.selectedGold.id,
        bidPrice: this.newBidPrice,
        askPrice: this.newAskPrice
      }

      this.goldService.updateBidAskGoldPrice(this.goldPrice).subscribe({
        next: (response: any) => {
          this.notificationService.show(
            `Gold with ID = ${this.selectedGold?.id} updated successfully`
          );
        },
  
        error: (err) => {
          console.error(err);
          this.notificationService.show('Error updating gold prices', 'Retry', 5000);
        },
      });;
    }
  }

  // Checking if the input is valid or not for mat-errors
  updateErrorMessage(controlName: string): string {
    const control = this.goldRateForm.get(controlName);
    let errorMessage: string = '';

    switch (true) {
      case control?.hasError('required'):
        errorMessage = 'This field is required';
        break;
      case control?.hasError('pattern'):
        if (controlName === 'bidRate') {
          errorMessage =
            'Bid Rate must be a decimal';
        }
        else if (controlName === 'askRate') {
          errorMessage =
            'Ask Rate must be a decimal';
        }
        break;
    }
    return errorMessage;
  }
}
