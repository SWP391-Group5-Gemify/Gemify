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

        public SaleCounterRevenueSpecification(DateOnly fromDate, DateOnly toDate)
            : base(x => x.Date.CompareTo(fromDate) >= 0 && x.Date.CompareTo(toDate) <= 0)
        {

        }

        public SaleCounterRevenueSpecification(int month, int year)
            : base(x => x.Date.Year == year && x.Date.Month == month)
        {

        }
    }
}