using Core.Enitities;

namespace Core.Interfaces
{
    public interface ISaleRevenueService
    {
        Task<IReadOnlyList<SaleRevenue>> GetMonthlyRevenuesAsync(int year);
        Task<decimal> GetYearlyRevenueAsync(int year);
        Task<IReadOnlyList<DashboardCounterRevenue>> GetSaleCounterMonthlyRevenuesAsync(int year);
        //Task<IReadOnlyList<SaleCounterRevenue>> GetSaleCounterYearlyRevenueAsync(int year);
        Task<IReadOnlyList<SaleCounterRevenueByMonth>> GetSaleCounterRevenueInMonthAsync(int month, int year);
        Task<IReadOnlyList<SaleCounterRevenueYearly>> GetSaleCounterRevenueYearlyAsync(int year);
    }
}
