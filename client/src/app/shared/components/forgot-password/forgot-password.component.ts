import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ForgotPasswordService } from '../../../core/services/forgot-password/forgot-password.service';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  email?: string;

  constructor(private forgotPasswordService: ForgotPasswordService, 
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
  ) {}

  emailForm = this.formBuilder.group({
    email: [
      '',
      [Validators.required, Validators.email],
    ]
  });

// Checking if the input is valid or not for mat-errors
updateErrorMessage(controlName: string): string {
  const control = this.emailForm.get(controlName);
  let errorMessage: string = '';

  switch (true) {
    case control?.hasError('required'):
      errorMessage = 'Vui lòng nhập Email';
      break;
    case control?.hasError('email'):
      errorMessage = 'Địa chỉ Email không hợp lệ';
      break;
  }
  return errorMessage;
}

  onSendResetPasswordLink() {
    var email = this.emailForm.get('email')!.value;
    this.forgotPasswordService.sendResetPasswordLink(email).subscribe({
      next: response => this.notificationService.show('Đã gửi email đổi mật khẩu thành công, vui lòng kiểm tra hộp thư của bạn'),
      error: error => this.notificationService.show('Gửi email không thành công, vui lòng nhập đúng địa chỉ email và thử lại')
    })
  }
}
