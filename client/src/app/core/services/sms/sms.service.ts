import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { SmsModel } from '../../models/sms.model';

@Injectable({
  providedIn: 'root',
})
export class SmsService {
  // ====================
  // == Fields
  // ====================
  baseUrl: string = environment.baseApiUrl.concat('/smsmessage');

  // ====================
  // == Life Cycle
  // ====================
  constructor(private httpClient: HttpClient) {}

  // ====================
  // == Methods
  // ====================
  sendSms(smsContent: SmsModel) {
    return this.httpClient.post<SmsModel>(this.baseUrl, smsContent);
  }
}
