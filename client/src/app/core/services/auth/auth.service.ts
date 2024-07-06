import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { RoleEnum } from '../../models/role.model';
import ImageUtils from '../../../shared/utils/ImageUtils';
import { CreateUpdateDeleteResponseModel } from '../../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // ====================
  // == Fields
  // ====================
  private baseAccountUrl = environment.baseApiUrl.concat('/account');

  // external access to change component's layout
  public currentUser = signal<UserModel | null>(null);
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
  constructor(private http: HttpClient) {}
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
   * Set a value to a token if having it
   */
  set token(value: string | null) {
    if (value) {
      localStorage.setItem(this.TOKEN_NAME, value);
    } else {
      localStorage.removeItem(this.TOKEN_NAME);
    }
  }

  /**
   * Login using JWT Authentication
   * - tap: allows to perform side effect action without modifying the stream
   * - When return the observable, tapping on the stream, and set the token to the local storage
   * @param values
   * @returns
   */
  public login(values: any): Observable<any> {
    return this.http
      .post<UserModel>(`${this.baseAccountUrl}/login`, values)
      .pipe(
        tap((response: UserModel) => {
          this.currentUser.set(response);
          this.token = response.token;
        })
      );
  }

  /**
   *
   * Logout of the system
   */
  public logout() {
    this.token = null;
    this.currentUser.set(null);
  }

  /**
   * Get the current user profile
   */
  public getCurrentUserProfile(): Observable<UserModel> {
    return this.http.get<UserModel>(this.baseAccountUrl).pipe(
      map((user) => {
        return {
          ...user,
          image_Url: ImageUtils.concatLinkToTokenFirebase(user.image_Url),
        };
      })
    );
  }

  /**
   * A function to check if current user role satistifed with some predefined route's roles
   * @param expectedRoles
   * @returns
   */
  public belongToAnyRoles(expectedRoles: RoleEnum[]): boolean {
    return expectedRoles.some((role) => role === this.currentUser()?.role);
  }

  /**
   * Register a new user account
   */
  public registerNewUser(
    user: UserModel
  ): Observable<CreateUpdateDeleteResponseModel> {
    return this.http.post<CreateUpdateDeleteResponseModel>(
      `${this.baseAccountUrl}/register`,
      user
    );
  }
}
