export interface EmployeeModel {
  id: number | string;
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

export enum EmployeeStatusEnum {
  Active = 'Active',
  Closed = 'Closed',
}

export interface EmployeeRoleEnum {
  storeManager: 'StoreManager';
  repurchaser: 'Repurchaser';
  appraiser: 'Appraiser';
  cashier: 'Cashier';
  seller: 'Seller';
  storeOwner: 'StoreOwner';
}
