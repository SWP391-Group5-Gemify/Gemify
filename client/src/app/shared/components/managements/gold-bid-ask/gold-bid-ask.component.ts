import { Component, OnInit } from '@angular/core';
import { GoldModel, WorldGoldPrice } from '../../../../core/models/gold.model';
import { GoldService } from '../../../../core/services/gold/gold.service';
import { DropdownModel } from '../../../../core/models/dropdown.model';
import { BehaviorSubject, forkJoin, map } from 'rxjs';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericDropdownComponent } from '../../generic-dropdown/generic-dropdown.component';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { MatIconModule } from '@angular/material/icon';


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
    MatIconModule
  ],
  templateUrl: './gold-bid-ask.component.html',
  styleUrl: './gold-bid-ask.component.scss',
})
export class GoldBidAskComponent implements OnInit{
  goldTypes: GoldModel[] = [];
  goldsDropdown!: DropdownModel[];
  worldGoldPrice!: number;
  newBidRate!: number;
  newAskRate!: number;
  private selectedGoldSource = new BehaviorSubject<GoldModel | null>(null);
  selectedGoldSource$ = this.selectedGoldSource.asObservable();

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
    this.getWorldGoldPrice();
    console.log(this.worldGoldPrice);
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
        this.worldGoldPrice = Math.round((goldPrice.price * currency.data.VND.value)/8.29);
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
     if (gold) this.selectedGoldSource.next(gold);
  }

  /**
   * Get selected gold
   * @returns value of the selected gold source
   */
  getSelectedGold() {
    return this.selectedGoldSource.value;
  }

  onSubmit() {
    console.log(this.goldRateForm.value);
    
    
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
