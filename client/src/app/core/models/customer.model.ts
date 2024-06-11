import { GenderEnum } from './gender-model.model';

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
