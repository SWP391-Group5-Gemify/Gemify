import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
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
   * Get token from local storage
   * - Used in HTTP Interceptor, sending token for every request
   */
  get token(): string | null {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  /**
   * Login using JWT Authentication
   * - tap: allows to perform side effect action without modifying the stream
   * - When return the observable, tapping on the stream, and set the token to the local storage
   * @param values
   * @returns
   */
  public login(values: any): Observable<any> {
    return this.http.post(`${this.baseAccountUrl}/login`, values).pipe(
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
    this.currentUser = undefined;
    this._isLoggedIn$.next(false);
  }

  /**
   * Decrypt the token payload, get the user information
   * @param token
   */
  public getCurrentUser(token: string | null): UserModel | undefined {
    return token
      ? (JSON.parse(atob(token?.split('.')[1])) as UserModel)
      : undefined;
  }

  /**
   * Register a new user account
   */
  public registerNewUser(user: UserModel): Observable<any> {
    return this.http.post(`${this.baseAccountUrl}/register`, user);
  }
}
