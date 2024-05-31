using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Enitities
{
    public class GoldType : BaseEntity
    {
        [Column(TypeName = "nvarchar(100)"), Required]
        public string Name { get; set; }
        [Column(TypeName = "decimal(18,2)"), Required]
        public float LatestBidPrice { get; set; }
        [Column(TypeName = "decimal(18,2)"), Required]
        public float LatestAskPrice { get; set; }
        [Column(TypeName = "nvarchar(10)"), Required]
        public string Unit { get; set; }
        public bool Status { get; set; } = true;
        [Column(TypeName = "decimal(18,2)"), Required]
        public float Content { get; set; }

    }
}
