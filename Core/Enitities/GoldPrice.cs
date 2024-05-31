using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Enitities
{
    public class GoldPrice : BaseEntity
    {
        [Required]
        public int GoldTypeId { get; set; }
        public GoldType GoldType { get; set; }
        [Column(TypeName = "decimal(18,2)"), Required]
        public float BidPrice { get; set; }
        [Column(TypeName = "decimal(18,2)"), Required]
        public float AskPrice { get; set; }
        [Required]
        public DateTime DateTime { get; set; } = DateTime.UtcNow;
    }
}
