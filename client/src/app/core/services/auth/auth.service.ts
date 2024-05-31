import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // ====================
  // == Fields
  // ====================
  private baseAccountUrl = environment.baseApiUrl.concat('/account');
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'jwt_token';

  // ====================
  // == Lifecycle
  // ====================
  constructor(private http: HttpClient, private router: Router) {}
  // ====================
  // == Methods
  // ====================

  /**
   * Login using JWT Authentication
   * - tap: allows to perform side effect action without modifying the stream
   * - When return the observable, tapping on the stream, and set the token to the local storage
   * @param username
   * @param password
   * @returns
   */
  login(username: string, password: string): any {
    const url = `${this.baseAccountUrl}/login`;
    let params = new HttpParams();
    params.append('userName', username);
    params.append('password', password);

    return this.http.post(url, { params: params }).pipe(
      tap((response: any) => {
        this.isLoggedIn$.next(true);
        localStorage.setItem(this.TOKEN_NAME, response.token);
      })
    );
  }

  get getToken(): string | undefined {
    return localStorage.getItem(this.TOKEN_NAME) || undefined;
  }
}
