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
  pageIndex?: number;
  pageSize?: number;
  searchName?: string;
  status?: boolean;
  revenueDate?: Date;
}

export interface AssignEmployeeIdModel {
  id: string | number;
  employeeId?: string | number | null;
}
