import { UserModel } from './user.model';

export interface EmployeeModel extends UserModel {
  id: number;
}

export enum EmployeeStatusEnum {
  Active = 'Active',
  Closed = 'Closed',
}
