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

@Component({
  selector: 'app-form-login',
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
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss',
})
export class FormLoginComponent implements OnInit {
  signInForm!: FormGroup;
  contact = {
    text: 'If you forgot your password. Please contact admin',
    number: '0909 312 423',
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      // required, min length is 6, max is 32, receive a to z, case insensitive
      userName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ])
      ),

      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  // Checking if the input is valid or not for mat-errors
  updateErrorMessage(controlName: string): string {
    const control = this.signInForm.get(controlName);
    let errorMessage: string = '';

    switch (true) {
      case control?.hasError('required'):
        errorMessage = 'This field is required';
        break;
      case control?.hasError('minlength') || control?.hasError('maxLength'):
        errorMessage = 'Must be between 6 and 32 characters long';
        break;
      case control?.hasError('pattern'):
        if (controlName === 'userName') {
          errorMessage =
            'Username must contain only letters and between 6 and 32 characters long';
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
   */
  login(): void {
    if (this.signInForm.valid) {
      this.authService.login(this.signInForm.value).subscribe({
        next: (resp) => {
          let pathToDashboard: string = '';
          switch (this.authService.currentUser?.role) {
            case RoleEnum.StoreOwner: {
              pathToDashboard = '/store-owner';
              break;
            }
            case RoleEnum.StoreManager: {
              pathToDashboard = '/store-manager';
              break;
            }
            case RoleEnum.Appraiser: {
              pathToDashboard = '/appraiser';
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
          }

          this.router.navigate([pathToDashboard]);
        },

        error: (error) => {
          //TODO: Popup or redirect user to Error Page
          console.log(error);
        },
      });
    }
  }
}
