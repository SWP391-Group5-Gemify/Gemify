export interface EmployeeModel {
  id: number | string;
  fullName: string;
  email: string;
  userName: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth: string;
  status: EmployeeStatus;
  image_Url: string;
  address: string;
  role: EmployeeRole;
}

export enum EmployeeStatus {
  Active = 'Active',
  Closed = 'Closed',
}

export interface EmployeeRole {
  storeManager: string;
  repurchaser: string;
  appraiser: string;
  cashier: string;
  seller: string;
  storeOwner: string;
}
