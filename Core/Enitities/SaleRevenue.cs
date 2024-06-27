using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Enitities
{
    public class SaleRevenue
    {
        public SaleRevenue(decimal revenue, DateOnly date)
        {
            Revenue = revenue;
            Date = date;
        }

        [Column(TypeName = "decimal(18,0)")]
        public decimal Revenue { get; set; }
        [Column(TypeName = "date")]
        public DateOnly Date { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    }
}
