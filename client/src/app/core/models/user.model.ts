import { EmployeeModel } from './employee.model';

export interface UserModel {
  id: number;
  fullName: string;
  email: string;
  userName: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth: Date;
  status: string;
  image_Url: string;
  address: string;
  role: string;
}

export const genderOptions = [
  { id: 1, name: 'Male' },
  { id: 2, name: 'Female' },
];
