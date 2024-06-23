using Core.Enitities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore.Query;

namespace Core.Specifications.Counters
{
    public class SaleCounterRevenueSpecification : BaseSpecification<SaleCounterRevenue>
    {
        public SaleCounterRevenueSpecification()
        {
            
        }

        public SaleCounterRevenueSpecification(int saleCounterId) : base(x => x.SaleCounterId == saleCounterId)
        {
            
        }
    }
}