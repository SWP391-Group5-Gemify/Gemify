using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Core.Enitities
{
    public class SaleRevenueByMonth
    {
        public SaleRevenueByMonth(decimal revenue, int month, int year)
        {
            Revenue = revenue;
            Month = month;
            this.year = year;
        }

        [Column(TypeName = "decimal(18,0)")]
        public decimal Revenue { get; set; }
        public int Month { get; set; }
        public int year { get; set; }
    }
}
