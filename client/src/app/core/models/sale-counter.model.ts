export interface SaleCounterModel {
  id: number;
  name: string;
  productQuantity: number;
  status: boolean;
  userName: string | null;
  userId: number | null;
}

export interface SaleCounterRevenueModel {
  revenue: number;
  saleCounterId: number;
  date: Date;
  id: number;
}

export interface SaleCounterParams {
  searchName?: string;
  status?: boolean;
  revenueDate?: Date;
}
