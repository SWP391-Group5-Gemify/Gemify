using Core.Enitities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore.Query;

namespace Core.Specifications.Counters
{
    public class SaleCounterRevenueSpecification : BaseSpecification<SaleCounterRevenue>
    {
        public SaleCounterRevenueSpecification(SaleCounterRevenueParams saleCounterRevenueParams)
            : base(x => x.SaleCounterId == saleCounterRevenueParams.saleCounterId)
        {
            AddOrderByDescending(x => x.Date);
            ApplyPaging(saleCounterRevenueParams.PageSize * (saleCounterRevenueParams.PageIndex - 1),
                saleCounterRevenueParams.PageSize);
        }

        public SaleCounterRevenueSpecification(DateOnly date)
            : base (x => x.Date.CompareTo(date) == 0)
        {

        }
    }
}