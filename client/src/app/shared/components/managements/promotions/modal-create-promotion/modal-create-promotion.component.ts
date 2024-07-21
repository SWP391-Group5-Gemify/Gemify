import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalConfigModel } from '../../../../../core/models/modal.model';
import { PromotionService } from '../../../../../core/services/promotion/promotion.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { PromotionModel } from '../../../../../core/models/promotion.model';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-modal-create-promotion',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
  ],
  templateUrl: './modal-create-promotion.component.html',
  styleUrl: './modal-create-promotion.component.scss',
  providers: [provideNativeDateAdapter(), DatePipe],
})
export class ModalCreatePromotionComponent implements OnInit {
  // =========================
  // == Fields
  // =========================
  public promotionForm: FormGroup = this.fb.group({
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    discount: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
    expDate: ['', [Validators.required]],
  });
  // =========================
  // == Life cycle
  // =========================
  constructor(
    @Inject(MAT_DIALOG_DATA) public modalConfigFromParent: ModalConfigModel,
    private modalRef: MatDialogRef<ModalCreatePromotionComponent>,
    private promotionService: PromotionService,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  // =========================
  // == Methods
  // =========================
  /**
   * Prevent use input "ENTER" key for exiting
   * @param event
   */
  public preventEnterKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  /**
   * Generate the error message
   * @param controlName
   * @returns
   */
  public getErrorMessage(controlName: string): string {
    const control = this.promotionForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Bạn phải nhập trường này';
    } else if (control?.hasError('min') || control?.hasError('max')) {
      return 'Khuyến mãi ở trong khoảng từ 0 tới 1';
    }
    return '';
  }

  /**
   * Handle form submission. If the form is valid, close the dialog and pass the form data.
   * This method is used to submit the form data and close the dialog with the submitted data.
   */
  public onSubmit(): void {
    if (this.promotionForm.valid) {
      let promotionObject: PromotionModel = {
        ...this.promotionForm.value,
        discount: this.promotionForm.get('discount')?.value,
        expDate: this.datePipe
          .transform(this.promotionForm.get('expDate')?.value, 'yyyy-MM-dd')
          ?.toString(),
      };

      // Create new promotion
      this.promotionService
        .createPromotion(promotionObject)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (promotion) => {
            if (promotion) {
              this.notificationService.show('Tạo khuyến mãi thành công');
              this.modalRef.close();
            }
          },

          error: (err) => {
            this.notificationService.show(err.error.message);
          },
        });
    }
  }

  /**
   * Close the dialog without submitting any data.
   * This method is used to cancel or close the form dialog without making changes.
   */
  onCancelClick() {
    this.modalRef.close();
  }
}
