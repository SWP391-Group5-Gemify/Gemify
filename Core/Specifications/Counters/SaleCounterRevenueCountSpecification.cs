using Core.Enitities;

namespace Core.Specifications.Counters
{
    public class SaleCounterRevenueCountSpecification : BaseSpecification<SaleCounterRevenue>
    {
        public SaleCounterRevenueCountSpecification(SaleCounterRevenueParams saleCounterRevenueParams)
            : base(x => x.SaleCounterId == saleCounterRevenueParams.saleCounterId)
        {

        }

    }
}