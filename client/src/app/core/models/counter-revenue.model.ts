export interface RevenueSaleCounterModel {
  saleCounterId: number;
  revenue: number;
  saleCounterName: string;
}

export interface RevenueMonthlyModel {
  month: number;
  saleCounterRevenueByMonths: RevenueSaleCounterModel[];
}

export interface RevenuesDataModel {
  revenue: number;
  month: number;
  year: number;
}
