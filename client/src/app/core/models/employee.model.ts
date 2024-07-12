import { RoleEnum } from './role.model';
import { UserLoginModel, UserModel } from './user.model';

export interface EmployeeModel extends UserModel {
  id: number;
}

export class EmployeeModel implements EmployeeModel, UserLoginModel {
  userName: string = 'default';
  password: string = '';
  status = EmployeeStatusEnum.Active;
  role = RoleEnum.Seller;
}

export enum EmployeeStatusEnum {
  Active = 'Hoạt Động',
  Closed = 'Đã Đóng',
}
