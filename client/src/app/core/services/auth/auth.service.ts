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
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false); // internal state
  public isLoggedIn$ = this._isLoggedIn$.asObservable(); // external access to change component's layout

  private readonly TOKEN_NAME = 'jwt_token';

  // ====================
  // == Lifecycle
  // ====================

  /**
   * Constructur
   * - that maintain the state of application using token
   * - Extract token, !!123 = !false = true, !!undefined = !true = false, and make sure storing only boolean
   * and the
   * @param http
   * @param router
   */
  constructor(private http: HttpClient, private router: Router) {
    const tokenValue: String = localStorage.getItem(this.TOKEN_NAME) ?? '';
    this._isLoggedIn$.next(!!tokenValue); // Convert value to falsy and truthy
  }
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
  login(username: string, password: string): Observable<any> {
    const url = `${this.baseAccountUrl}/login`;
    let params = new HttpParams();
    params.append('userName', username);
    params.append('password', password);

    return this.http.post(url, { params: params }).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true); // emit the true as logged in user
        localStorage.setItem(this.TOKEN_NAME, response.token);
      })
    );
  }

  get getToken(): string | '' {
    return localStorage.getItem(this.TOKEN_NAME) || '';
  }
}
