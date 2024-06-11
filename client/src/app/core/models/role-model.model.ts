export interface RoleModel {
  id: number;
  name: string;
}

export enum RoleEnum {
  StoreManager = 'StoreManager',
  Repurchaser = 'Repurchaser',
  Appraiser = 'Appraiser',
  Cashier = 'Cashier',
  Seller = 'Seller',
  StoreOwner = 'StoreOwner',
}
