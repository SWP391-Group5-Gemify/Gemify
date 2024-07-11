using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Enitities
{
    public class GoldPrice : BaseEntity
    {
        public GoldPrice(int GoldTypeId, decimal BidPrice, decimal AskPrice)
        {
            this.GoldTypeId = GoldTypeId;
            this.BidPrice = BidPrice;
            this.AskPrice = AskPrice;
            this.DateTime = DateTime.Now;
        }

        [Required]
        public int GoldTypeId { get; set; }
        public GoldType GoldType { get; set; }
        [Column(TypeName = "decimal(18,0)"), Required]
        public decimal BidPrice { get; set; }
        [Column(TypeName = "decimal(18,0)"), Required]
        public decimal AskPrice { get; set; }
        [Required]
        public DateTime DateTime { get; set; } = DateTime.Now;
    }
}
