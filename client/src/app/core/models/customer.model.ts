import { GenderEnum } from './gender.model';

export interface CustomerModel {
  id: number;
  name: string;
  gender: GenderEnum;
  phone: string;
  address: string;
  point: number;
  membershipId: number;
  membershipRate: string;
}

export interface CustomerCreateModel {
  name: string;
  gender: string;
  phone: string;
  address: string;
}
