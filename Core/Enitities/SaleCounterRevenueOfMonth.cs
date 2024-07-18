using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Enitities
{
    public class SaleCounterRevenueOfMonth
    {
        public int SaleCounterId { get; set; }
        public string SaleCounterName { get; set; }
        public decimal Revenue { get; set; }
    }
}
