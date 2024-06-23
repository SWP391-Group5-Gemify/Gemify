using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Enitities
{
    public class SaleCounterRevenue : BaseEntity
    {
        [Column(TypeName = "decimal(18,0)")]
        public decimal Revenue { get; set; }
        public int SaleCounterId {  get; set; }
        [Column(TypeName = "date")]
        public DateOnly Date {  get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    }
}
