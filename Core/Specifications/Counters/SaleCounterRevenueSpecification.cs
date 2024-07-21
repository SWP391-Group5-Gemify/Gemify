using Core.Enitities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore.Query;

namespace Core.Specifications.Counters
{
    public class SaleCounterRevenueSpecification : BaseSpecification<SaleCounterRevenue>
    {
        public SaleCounterRevenueSpecification()
        {
            AddOrderBy(x => x.Date);
        }

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

        public SaleCounterRevenueSpecification(int month, int year)
            : base(x => x.Date.Month == month && x.Date.Year == year)
        {
            AddInclude(r => r.SaleCounter);
        }

        public SaleCounterRevenueSpecification(int saleCounterId, int month, int year)
            : base(x => x.SaleCounterId == saleCounterId && x.Date.Month == month
            && x.Date.Year == year)
        {
            AddInclude(r => r.SaleCounter);
        }
    }
}