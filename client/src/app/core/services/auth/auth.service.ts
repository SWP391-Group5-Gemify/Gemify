import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  roleAs: string;

  constructor() {}

  // calling API from here
  // login(username: string, password: string): boolean {}
}
