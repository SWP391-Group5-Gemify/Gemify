using Core.Enitities;

namespace Core.Interfaces
{
    public interface ISaleRevenueService
    {
        Task<IReadOnlyList<SaleRevenue>> GetSaleRevenueByDateAsync(DateOnly startDate, DateOnly endDate);
        Task<IReadOnlyList<SaleRevenue>> GetSaleRevenuesByMonthAsync(int year);
        Task<decimal> GetTotalSaleRevenueByDateAsync(DateOnly date);
        Task<decimal> GetSaleRevenueByYearAsync(int year);
        Task<IReadOnlyList<DashboardCounterRevenue>> GetSaleCounterRevenuesByMonthAsync(int year);
    }
}
