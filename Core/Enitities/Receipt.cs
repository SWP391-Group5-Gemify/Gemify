using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Enitities.Identity;

namespace Core.Enitities
{
    public class Receipt : BaseEntity
    {
        [Column(TypeName = "decimal(18, 2)"), Required]
        public decimal TotalPrice { get; set; }

        [Column(TypeName = "nvarchar(450)"), Required]
        public string UserId { get; set; }
        public User User { get; set; }

        public DateTime DateTime { get; set; } = DateTime.UtcNow;

        [Required]
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        [Column(TypeName = "varchar(100)"), Required]
        public string PaymentMethod { get; set; }

        [Required]
        public int PromotionId { get; set; }
        public Promotion Promotion { get; set; }
    }
}