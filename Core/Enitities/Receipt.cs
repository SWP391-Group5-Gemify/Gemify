using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Enitities
{
    public class Receipt : BaseEntity
    {
        public decimal TotalPrice { get; set; }
        
        public string Receipt_UserId { get; set; }
        public User ReceiptUser { get; set; }

        public DateTime DateTime { get; set; }

        public int Receipt_CustomerId { get; set; }
        public Customer ReceiptCustomer { get; set; }

        public string PaymentMethod { get; set; }

        public int Receipt_PromotionId { get; set; }
        public Promotion ReceiptPromotion { get; set; }
    }
}