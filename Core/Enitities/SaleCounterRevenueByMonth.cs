using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Enitities
{
    public class SaleCounterRevenueByMonth 
    {
        public decimal Revenue { get; set; }
        public int SaleCounterId { get; set; }
        public string SaleCounterName { get; set; }
    }
}
