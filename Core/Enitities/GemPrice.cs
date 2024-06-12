

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Enitities
{
    public class GemPrice : BaseEntity
    {

        public GemPrice(int gemTypeId, decimal price) 
        {
            GemTypeId = gemTypeId;
            Price = price;
        }

        [Required]
        public int GemTypeId { get; set; }
        public GemType GemType { get; set; }
        [Column(TypeName = "decimal(18,2)"), Required]
        public decimal Price { get; set; }
        public DateTime DateTime { get; set; } = DateTime.UtcNow;
    }
}
