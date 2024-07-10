import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MembershipModel } from '../../models/membership.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembershipService {
  // ========================
  // == Fields
  // ========================
  private baseMembershipApi = environment.baseApiUrl.concat('/memberships');

  // ========================
  // == Constructors
  // ========================
  constructor(private httpClient: HttpClient) {}

  // ========================
  // == Methods
  // ========================

  /**
   * Fetches the membership details by ID from the API.
   *
   * @param {number} id - The ID of the membership to fetch.
   * @returns {Observable<MembershipModel>} - An Observable containing the membership details.
   */
  getMembershipById(id: number): Observable<MembershipModel> {
    return this.httpClient.get<MembershipModel>(
      `${this.baseMembershipApi}/${id}`
    );
  }
}
