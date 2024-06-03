export interface EmployeeModel {
  id: number;
  fullName: string;
  email: string;
  userName: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth: string;
  status: EmployeeStatusEnum;
  image_Url: string;
  address: string;
  role: EmployeeRoleEnum;
}

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
