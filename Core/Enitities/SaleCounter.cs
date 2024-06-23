
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Core.Enitities.Identity;

namespace Core.Enitities
{
    public class SaleCounter : BaseEntity
    {
        [Column(TypeName = "varchar(50)"), Required]
        public string Name { get; set; }
        public int? ProductQuantity { get; set; }
        public bool Status { get; set; } = true;
        public int? UserId { get; set; }
        public User User { get; set; }
        public IReadOnlyList<SaleCounterRevenue> SaleCounterRevenue { get; set;}
    }
}
