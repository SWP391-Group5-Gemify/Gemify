using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Enitities
{
    public class GoldPrice : BaseEntity
    {
        [Required]
        public int GoldTypeId { get; set; }
        public GoldType GoldType { get; set; }
        [Column(TypeName = "decimal(18,2)"), Required]
        public float LatestBidPrice { get; set; }
        [Column(TypeName = "decimal(18,2)"), Required]
        public float LatestAskPrice { get; set; }
        [Column(TypeName = "decimal(18,2)"), Required]
        public float LatestBidRate { get; set; }
        [Column(TypeName = "decimal(18,2)"), Required]
        public float LatestAskRate { get; set; }
        [Required]
        public DateTime DateTime { get; set; }
    }
}
