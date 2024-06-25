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
        Task<int> CountSaleRevenuesAsync(ISpecification<SaleRevenue> spec);

        Task<IReadOnlyList<SaleRevenue>> GetSaleRevenueByDateAsync(DateOnly startDate, DateOnly endDate);

        bool IsLeapYear(int year);

        Task<IReadOnlyList<SaleRevenueByMonth>> GetSaleRevenuesByMonthAsync(int year);
    }
}
