import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ForgotPasswordService } from '../../../core/services/forgot-password/forgot-password.service';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordModel } from '../../../core/models/reset-password.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  resetPassword = new ResetPasswordModel();

  constructor(private forgotPasswordService: ForgotPasswordService, 
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const encodedEmail = params.get('email');
      const encodedToken = params.get('token');

      // Decode token URL encode and email URL encode
      if (encodedEmail && encodedToken) {
        this.resetPassword.email = decodeURIComponent(encodedEmail);
        this.resetPassword.token = decodeURIComponent(encodedToken);
      }
    });

  }

  passwordForm = this.formBuilder.group({
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*\d).{8,15}$/)
      ]
    ],
    confirmPassword: [
      '',
      [Validators.required, this.matchValidator()]
    ]
  });

  // Checking if the input is valid or not for mat-errors
  updateErrorMessage(controlName: string): string {
    const control = this.passwordForm.get(controlName);
    let errorMessage: string = '';

    switch (true) {
      case control?.hasError('required'):
        errorMessage = 'Vui lòng nhập mật khẩu mới';
        break;
      case control?.hasError('password'):
        errorMessage = 'Mật khẩu phải có 8-15 kí tự và ít nhất một chữ số';
        break;
      case control?.hasError('confirmPassword'):
        errorMessage = 'Mật khẩu không trùng khớp';
        break;
    }
    return errorMessage;
  }

  // Validate confirm password is the same as password
  matchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Don't validate if confirm password is empty
      }
  
      if (control.value !== this.passwordForm.get('password')?.value) {
        return { passwordMismatch: true };
      }
  
      return null;
    };
  }

  // Reset password with the generated token from server
  onResetPassword() {
    this.resetPassword.password = this.passwordForm.get('password')!.value!;
    this.resetPassword.confirmPassword = this.passwordForm.get('confirmPassword')!.value!;
    
    this.forgotPasswordService.resetPassword(this.resetPassword).subscribe({
      next: response => {
        this.notificationService.show("Thay đổi mật khẩu thành công");
        this.router.navigate(['/']);
      },
      error: error => this.notificationService.show("Thay đổi mật khẩu thất bại")
    });
  }
}
