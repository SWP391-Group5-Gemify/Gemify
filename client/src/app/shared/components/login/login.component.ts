import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { RoleEnum } from '../../../core/models/role.model';
import { UserModel } from '../../../core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  // ============================
  // == Fields
  // ============================

  signInForm!: FormGroup;
  contact = {
    text: 'If you forgot your password. Please contact admin',
    number: '0909 312 423',
  };

  // ============================
  // == Constructors
  // ============================
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redirect to corresponding dashboard if JWT is still valid
    const token = this.authService.token;
    if (token) {
      const currentUserSession =
        this.authService.getCurrentUserFromToken(token);
      this.redirectToDashboardPath(currentUserSession?.role);
    }

    // SignIn Form
    this.signInForm = this.formBuilder.group({
      // required, min length is 6, max is 32, receive a to z, case insensitive
      userName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32),
          Validators.pattern(/^[a-z]{4,32}$/i),
        ])
      ),

      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  // ============================
  // == Methods
  // ============================

  // Checking if the input is valid or not for mat-errors
  updateErrorMessage(controlName: string): string {
    const control = this.signInForm.get(controlName);
    let errorMessage: string = '';

    switch (true) {
      case control?.hasError('required'):
        errorMessage = 'This field is required';
        break;
      case control?.hasError('minlength') || control?.hasError('maxLength'):
        errorMessage = 'Must be between 4 and 32 characters long';
        break;
      case control?.hasError('pattern'):
        if (controlName === 'userName') {
          errorMessage =
            'Username must contain only letters and between 4 and 32 characters long';
        }
        break;
    }

    return errorMessage;
  }

  /**
   * Login function for the form group
   * - From Group invalid when any single validator applied to the FormControl failed
   * - Calling AuthService to login
   *    - If success, goes to dashboard based on role
   *    - If failed, popup or showing to message
   * - If  already login, means having JWT token, then goes to the corresponding dashboard
   *
   */
  login(): void {
    if (this.signInForm.valid) {
      this.authService.login(this.signInForm.value).subscribe({
        next: (user: UserModel) => {
          console.table(user);
          this.redirectToDashboardPath(user.role);
        },
        error: (error) => {
          //TODO: Popup or redirect user to Error Page
          console.error(error);
        },
      });
    }
  }

  /**
   * A group of paths that being redirected from login page
   * @param role
   */
  redirectToDashboardPath(role: RoleEnum | undefined) {
    let pathToDashboard: string = '';
    switch (role) {
      case RoleEnum.StoreOwner: {
        pathToDashboard = '/store-owner';
        break;
      }
      case RoleEnum.StoreManager: {
        pathToDashboard = '/store-manager';
        break;
      }
      case RoleEnum.Cashier: {
        pathToDashboard = '/cashier';
        break;
      }
      case RoleEnum.Repurchaser: {
        pathToDashboard = '/repurchaser';
        break;
      }
      case RoleEnum.Seller: {
        pathToDashboard = '/seller';
        break;
      }
      default: {
        pathToDashboard = '/';
        break;
      }
    }
    this.router.navigate([pathToDashboard]);
  }
}
