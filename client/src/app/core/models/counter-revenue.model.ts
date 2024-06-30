// src/app/core/models/revenuesData.model.ts

export interface SaleCounterRevenue {
    saleCounterId: number;
    revenue: number;
    saleCounterName: string;
}

export interface MonthlyRevenue {
    month: number;
    saleCounterRevenueByMonths: SaleCounterRevenue[];
}