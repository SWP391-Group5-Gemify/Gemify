import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-edit-create-modal',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatDialogModule],
  templateUrl: './form-edit-create-modal.component.html',
  styleUrl: './form-edit-create-modal.component.scss',
})
export class FormEditCreateModalComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dataFromParent: any,
    private ref: MatDialogRef<FormEditCreateModalComponent>
  ) {}

  ngOnInit(): void {}

  /**
   * Close the modal
   */
  closeModal() {
    this.ref.close();
    console.log(this.dataFromParent);
  }

  // This will call the request api
  saveModal() {}
}
