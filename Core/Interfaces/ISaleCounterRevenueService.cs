using Core.Enitities;
using Core.Specifications;
using Core.Specifications.Counters;

namespace Core.Interfaces
{
    public interface ISaleCounterRevenueService
    {
        Task<IReadOnlyList<SaleCounterRevenue>> 
            GetSaleCounterRevenuesByIdAsync(SaleCounterRevenueSpecification spec);

        Task<IReadOnlyList<SaleCounterRevenue>> GetSaleCounterRevenuesByDateAsync(DateOnly date);
        
        Task<int> UpdateSaleCounterRevenuesAsync();
        
        Task<int> CountSaleCounterRevenuesAsync(ISpecification<SaleCounterRevenue> spec);

        Task<decimal> GetTotalSaleRevenueByDateAsync(DateOnly date);
    }
}