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
  signInForm!: FormGroup;
  contact = {
    text: 'If you forgot your password. Please contact admin',
    number: '0909 312 423',
  };

  // Inject FormBuilder Service into the constructor
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  // On Init
  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      // required, min length is 6, max is 32, receive a to z, case insensitive
      username: new FormControl(
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
        if (controlName === 'username') {
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
    if (!this.signInForm.invalid) {
      const username: string = this.signInForm.get('username')?.value;
      const password: string = this.signInForm.get('password')?.value;

      // calling login service
      this.authService.login(username, password).subscribe({
        next: (responsee) => {
          this.router.navigate(['/store-owner']);
        },

        error: (error) => {
          //TODO: Popup or redirect user to Error Page
          console.log(error);
        },
      });
    }
  }
}
