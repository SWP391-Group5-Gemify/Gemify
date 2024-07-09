import { Component } from '@angular/core';
import {
  SaleCounterModel,
  SaleCounterParams,
} from '../../../../core/models/sale-counter.model';
import { Observable } from 'rxjs';
import { DropdownModel } from '../../../../core/models/dropdown.model';

@Component({
  selector: 'app-counters',
  standalone: true,
  imports: [],
  templateUrl: './counters.component.html',
  styleUrl: './counters.component.scss',
})
export class CountersComponent {
  // ====================
  // == Fields
  // ====================
  public saleCounters$!: Observable<SaleCounterModel[]>;
  public saleCountersStatusDropdown: DropdownModel[] = [
    {
      name: 'Còn hoạt động',
      value: true,
    },
    {
      name: 'Không hoạt động',
      value: false,
    },
  ];

  public saleCounterParams: SaleCounterParams = {
    status: undefined,
    searchName: undefined,
  };

  // ====================
  // == Lifecycle
  // ====================
  // ====================
  // == Methods
  // ====================
}
