import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ResetPasswordModel } from '../../models/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  baseUrl: string = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  sendResetPasswordLink(email: string | null) {
    return this.httpClient.post(this.baseUrl + '/account/forgot-password?email=' + email, null);
  }

  resetPassword(resetPassword: ResetPasswordModel) {
    return this.httpClient.post(this.baseUrl + '/account/reset-password', resetPassword);
  }  
}
