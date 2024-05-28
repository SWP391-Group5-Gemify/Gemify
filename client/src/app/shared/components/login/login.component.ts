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
  signInForm?: FormGroup;
  contact = {
    text: 'If you forgot your password. Please contact admin',
    number: '0909 312 423',
  };

  // Inject FormBuilder Service into the constructor
  constructor(private formBuilder: FormBuilder) {}

  // On Init
  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      // required, min length is 6, max is 32, receive a to z, case insensitive
      username: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ])
      ),

      // at least 1 special appear anywhere, a to z, 0 to 9, min 6 and max 32
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/),
        ])
      ),
    });
  }

  // Checking if the input is valid or not for mat-errors
  getErrorMessageOnControl(controlName: string): string {
    const control = this.signInForm!.get(controlName);

    let errorMessage: string = '';

    switch (true) {
      case control?.hasError('required'):
        errorMessage = 'This field is required';
        break;
      case control?.hasError('minlength'):
        errorMessage = 'Must be at least 6 characters long';
        break;
      case control?.hasError('pattern'):
        if (controlName === 'username') {
          ('Username must contain only letters and be between 6 and 32 characters long');
        } else {
          ('Password must contain at least one special character and be between 6 and 32 characters long');
        }
        break;
    }
    return errorMessage;
  }

  // On Submit Form
  login(): void {
    this.signInForm?.value.username;
  }
}
