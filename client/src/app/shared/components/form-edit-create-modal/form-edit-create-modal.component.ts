import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-edit-create-modal',
  standalone: true,
  imports: [MatDialog],
  templateUrl: './form-edit-create-modal.component.html',
  styleUrl: './form-edit-create-modal.component.scss',
})
export class FormEditCreateModalComponent {}
