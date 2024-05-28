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

  // Inject FormBuilder Service into the constructor
  constructor(private formBuilder: FormBuilder) {}

  // On Init
  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      username: new FormControl(''), // default value change in username
      password: new FormControl(''), // default value change in password
    });

    // setTimeout(() => {
    //   this.signInForm?.reset;
    //   this.signInForm?.patchValue({
    //     username: 'Vu Kim Duy',
    //   });
    // }, 500);
  }

  onSubmit() {
    console.log(this.signInForm);
  }
}
