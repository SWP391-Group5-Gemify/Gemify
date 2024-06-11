import { UserModel } from './user.model';

export interface EmployeeModel extends UserModel {}

export enum EmployeeStatusEnum {
  Active = 'Active',
  Closed = 'Closed',
}
