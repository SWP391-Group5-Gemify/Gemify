using Core.Enitities;
using Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ISaleRevenueService
    {
        Task<IReadOnlyList<SaleRevenue>> GetSaleRevenueByDateAsync(DateOnly startDate, DateOnly endDate);
        bool IsLeapYear(int year);
        Task<IReadOnlyList<SaleRevenueByMonth>> GetSaleRevenuesByMonthAsync(int year);
        Task<decimal> GetTotalSaleRevenueByDateAsync(DateOnly date);
        Task<decimal> GetSaleRevenueByYearAsync(int year);
        Task<IReadOnlyList<DashboardCounterRevenue>> GetSaleCounterRevenuesByMonthAsync(int year);
    }
}
