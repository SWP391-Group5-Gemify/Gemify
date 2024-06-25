using Core.Enitities;
using Core.Specifications.Counters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications.Sales
{
    public class SaleRevenueSpecification : BaseSpecification<SaleRevenue>
    {
        public SaleRevenueSpecification(SaleRevenueParams saleRevenueParams)
            : base()
        {
            AddOrderByDescending(x => x.Date);
            ApplyPaging(saleRevenueParams.PageSize * (saleRevenueParams.PageIndex - 1),
                saleRevenueParams.PageSize);
        }

        public SaleRevenueSpecification(DateOnly fromDate, DateOnly toDate)
            : base(x => x.Date >= fromDate && x.Date <= toDate)
        {

        }
    }
}
