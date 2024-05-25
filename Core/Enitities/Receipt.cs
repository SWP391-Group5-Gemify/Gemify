using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Enitities.Identity;

namespace Core.Enitities
{
    public class Receipt : BaseEntity
    {
        [Column(TypeName = "decimal(18, 2)"), Required]
        public decimal TotalPrice { get; set; }

        [Column(TypeName = "nvarchar(450)"), Required]
        public string Receipt_UserId { get; set; }
        public User ReceiptUser { get; set; }

        public DateTime DateTime { get; set; } = DateTime.UtcNow;

        [Required]
        public int Receipt_CustomerId { get; set; }
        public Customer ReceiptCustomer { get; set; }

        [Column(TypeName = "varchar(100)"), Required]
        public string PaymentMethod { get; set; }

        [Required]
        public int Receipt_PromotionId { get; set; }
        public Promotion ReceiptPromotion { get; set; }
    }
}