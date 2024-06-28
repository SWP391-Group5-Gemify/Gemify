using Core.Enitities;

namespace Core.Interfaces
{
    public interface ISaleRevenueService
    {
        Task<IReadOnlyList<SaleRevenue>> GetMonthlyRevenuesAsync(int year);
        Task<decimal> GetYearlyRevenueAsync(int year);
        Task<IReadOnlyList<DashboardCounterRevenue>> GetSaleCounterMonthlyRevenuesAsync(int year);
        Task<decimal> GetSaleCounterYearlyRevenueAsync(int year);
    }
}
