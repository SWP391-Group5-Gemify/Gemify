using Core.Enitities;

namespace Core.Interfaces
{
    public interface ISaleCounterRevenueService
    {
        Task<IReadOnlyList<SaleCounterRevenue>> GetSaleCounterRevenuesByIdAsync(int id);
        Task<bool> UpdateAllSaleCounterRevenuesAsync();
        Task<bool> UpdateSaleCounterRevenuesByIdAsync(int id);
        Task<>
    }
}