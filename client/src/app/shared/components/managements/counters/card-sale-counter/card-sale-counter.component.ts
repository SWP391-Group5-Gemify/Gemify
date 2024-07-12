import { Component, input, OnInit, output } from '@angular/core';
import {
  AssignEmployeeIdModel,
  SaleCounterModel,
} from '../../../../../core/models/sale-counter.model';
import { EmployeeService } from '../../../../../core/services/employee/employee.service';

import { DropdownModel } from '../../../../../core/models/dropdown.model';
import { EmployeeModel } from '../../../../../core/models/employee.model';
import { map } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { GenericDropdownComponent } from '../../../generic-dropdown/generic-dropdown.component';

@UntilDestroy()
@Component({
  selector: 'app-card-sale-counter',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    GenericDropdownComponent,
  ],
  templateUrl: './card-sale-counter.component.html',
  styleUrl: './card-sale-counter.component.scss',
})
export class CardSaleCounterComponent implements OnInit {
  // ====================
  // == Fields
  // ====================
  public saleCounter = input.required<SaleCounterModel>();
  public onAssignEmployeeId = output<AssignEmployeeIdModel>();
  public allSellersDropdown!: DropdownModel[];

  // ====================
  // == Constructors
  // ====================
  constructor(private employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.loadAllSellersDropdown();
  }

  // ====================
  // == Methods
  // ====================

  /**
   * Checking weather the counter is current unassigned or assigned
   * @returns
   */
  public isUnassigned(): boolean {
    return this.saleCounter().userId == null;
  }

  /**
   * Load all sellers to the dropdown
   */
  public loadAllSellersDropdown() {
    this.employeeService
      .getAllSellers()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (sellers: any) => {
          this.allSellersDropdown = sellers.map((seller: EmployeeModel) => ({
            value: seller.id,
            name: seller.fullName,
          }));
        },

        error(err) {
          console.error(err);
        },
      });
  }

  /**
   * Assigning the employeeId to the counter
   * @param assignObject
   */
  public onAssignEmployeeIdFromChild(event: any) {
    const employeeId = event?.value;

    const assignedObject: AssignEmployeeIdModel = {
      employeeId: employeeId,
      id: this.saleCounter().id,
    };

    this.onAssignEmployeeId.emit(assignedObject);
  }

  /**
   * Unassign any employee from thsi counter
   */
  public onUnassignEmployeeFromCounter() {
    const assignedObject: AssignEmployeeIdModel = {
      employeeId: null,
      id: this.saleCounter().id,
    };

    this.onAssignEmployeeId.emit(assignedObject);
  }
}
