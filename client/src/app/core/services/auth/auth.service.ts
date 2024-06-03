import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // ====================
  // == Fields
  // ====================
  private baseAccountUrl = environment.baseApiUrl.concat('/account');
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  // external access to change component's layout
  public isLoggedIn$ = this._isLoggedIn$.asObservable();
  public currentUser?: UserModel;
  private readonly TOKEN_NAME = 'jwt_token';

  /**
   * Get token from local storage
   * - Used in HTTP Interceptor, sending token for every request
   */
  get token(): string | null {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  // ====================
  // == Lifecycle
  // ====================

  /**
   * Constructor
   * - that maintain the state of application using token
   * - Extract token, !!123 = !false = true, !!undefined = !true = false, and make sure storing only boolean
   * and the
   * @param http
   * @param router
   */
  constructor(private http: HttpClient) {
    this._isLoggedIn$.next(!!this.token); // Convert value to falsy and truthy
    this.currentUser = this.getCurrentUser(this.token);
  }
  // ====================
  // == Methods
  // ====================

  /**
   * Login using JWT Authentication
   * - tap: allows to perform side effect action without modifying the stream
   * - When return the observable, tapping on the stream, and set the token to the local storage
   * @param values
   * @returns
   */
  public login(values: any): Observable<any> {
    const url = `${this.baseAccountUrl}/login`;
    return this.http.post(url, values).pipe(
      tap((response: any) => {
        this.currentUser = this.getCurrentUser(response.token);
        this._isLoggedIn$.next(true); // emit the true as logged in user
        localStorage.setItem(this.TOKEN_NAME, response.token);
      })
    );
  }

  /**
   * Logout of the system
   */
  public logout() {
    localStorage.removeItem(this.TOKEN_NAME);
    this._isLoggedIn$.next(false);
  }

  /**
   * Decrypt the token payload, get the user information
   * @param token
   */
  private getCurrentUser(token: string | null): UserModel | undefined {
    return token
      ? (JSON.parse(atob(token?.split('.')[1])) as UserModel)
      : undefined;
  }
}
