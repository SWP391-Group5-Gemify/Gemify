using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Enitities
{
    public class DashboardCounterRevenue
    {
        public int month { get; set; }
        public IReadOnlyList<SaleCounterRevenueByMonth> saleCounterRevenueByMonths { get; set; }
    }
}
