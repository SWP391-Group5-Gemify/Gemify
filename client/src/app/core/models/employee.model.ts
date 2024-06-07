import { UserModel } from './user.model';

export interface EmployeeModel extends UserModel {}

export interface EmployeeRoleModel {
  id: number;
  name: string;
}

export enum EmployeeStatusEnum {
  Active = 'Active',
  Closed = 'Closed',
}

export enum EmployeeRoleEnum {
  StoreManager = 'StoreManager',
  Repurchaser = 'Repurchaser',
  Appraiser = 'Appraiser',
  Cashier = 'Cashier',
  Seller = 'Seller',
  StoreOwner = 'StoreOwner',
}
