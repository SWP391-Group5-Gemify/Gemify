import { Component, input, output } from '@angular/core';
import {
  AssignEmployeeIdModel,
  SaleCounterModel,
} from '../../../../../core/models/sale-counter.model';
import { EmployeeService } from '../../../../../core/services/employee/employee.service';

@Component({
  selector: 'app-card-sale-counter',
  standalone: true,
  imports: [],
  templateUrl: './card-sale-counter.component.html',
  styleUrl: './card-sale-counter.component.scss',
})
export class CardSaleCounterComponent {
  // ====================
  // == Fields
  // ====================
  public saleCounter = input.required<SaleCounterModel>();
  public onAssignEmployeeId = output<AssignEmployeeIdModel>();

  // ====================
  // == Constructors
  // ====================
  constructor(employeeService: EmployeeService) {}

  // ====================
  // == Methods
  // ====================

  /**
   * Checking weather the counter is current unassigned or assigned
   * @returns
   */
  public isUnassigned(): boolean {
    return this.saleCounter().userId == undefined;
  }

  public loadAllUnassignedSellersDropdown() {}

  /**
   * Assigning the employeeId to the counter
   * @param assignObject
   */
  public onAssignEmployeeIdFromChild(assignObject: AssignEmployeeIdModel) {
    this.onAssignEmployeeId.emit(assignObject);
  }
}
