using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Enitities
{
    public class SaleCounterRevenue : BaseEntity
    {
        public SaleCounterRevenue()
        {

        }
        
        public SaleCounterRevenue(decimal revenue, int saleCounterId, DateOnly date)
        {
            Revenue = revenue;
            SaleCounterId = saleCounterId;
            Date = date;
        }

        public SaleCounterRevenue(decimal revenue, DateOnly date)
        {
            Revenue = revenue;
            Date = date;
        }
        
        [Column(TypeName = "decimal(18,0)")]
        public decimal Revenue { get; set; }
        public int? SaleCounterId {  get; set; }
        [Column(TypeName = "date")]
        public DateOnly Date {  get; set; } = DateOnly.FromDateTime(DateTime.Now);
        public SaleCounter SaleCounter {get; set;}
    }
}
