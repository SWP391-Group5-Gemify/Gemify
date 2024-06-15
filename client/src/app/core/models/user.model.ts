import { GenderEnum } from './gender.model';
import { RoleEnum } from './role.model';

export interface UserModel {
  id: number;
  fullName: string;
  email: string;
  userName: string;
  gender: GenderEnum;
  phoneNumber: string;
  dateOfBirth: Date;
  status: string;
  image_Url: string;
  address: string;
  role: RoleEnum;
}
