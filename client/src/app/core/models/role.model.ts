export interface RoleModel {
  id: number;
  name: string;
}

export enum RoleEnum {
  StoreManager = 'StoreManager',
  Repurchaser = 'Repurchaser',
  Cashier = 'Cashier',
  Seller = 'Seller',
  StoreOwner = 'StoreOwner',
}
