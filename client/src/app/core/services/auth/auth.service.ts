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
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  // external access to change component's layout
  public isLoggedIn$ = this._isLoggedIn$.asObservable();
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
  constructor(private http: HttpClient, private router: Router) {
    const tokenValue: String | null = localStorage.getItem(this.TOKEN_NAME);
    this._isLoggedIn$.next(!!tokenValue); // Convert value to falsy and truthy
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
  login(values: any): Observable<any> {
    const url = `${this.baseAccountUrl}/login`;
    return this.http.post(url, values).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true); // emit the true as logged in user
        localStorage.setItem(this.TOKEN_NAME, response.token);
      })
    );
  }

  /**
   * Logout of the system
   */
  logout() {
    localStorage.removeItem(this.TOKEN_NAME);
    this._isLoggedIn$.next(false);
  }

  /**
   * Get token from local storage
   */
  get getToken(): string | '' {
    return localStorage.getItem(this.TOKEN_NAME) || '';
  }
}
