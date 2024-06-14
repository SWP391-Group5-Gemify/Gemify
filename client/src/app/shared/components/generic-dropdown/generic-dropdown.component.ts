import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { DropdownModel } from '../../../core/models/dropdown.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-generic-dropdown',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './generic-dropdown.component.html',
  styleUrl: './generic-dropdown.component.scss',
})
export class GenericDropdownComponent {
  // ===========================================
  // == Fields
  // ===========================================

  @Input() label: string | undefined;
  @Input() options!: DropdownModel[];
  @Output() onSelectionChange = new EventEmitter<string | number>();

  // ===========================================
  // == Methods
  // ===========================================
  onSelectionChangeFromChild(event: any) {
    this.onSelectionChange.emit(event.value);
  }
}
