import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  constructor() {}

  // calling API from here
  login(username: string, password: string): boolean {}
}
