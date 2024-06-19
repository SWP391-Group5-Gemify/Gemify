using Core.Attributes;
using Core.Enitities.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Enitities.OrderAggregate
{
    public class Order : BaseEntity
    {
        public Order()
        {
        }
        public Order(int orderTypeId, 
            decimal subtotal, int customerId, int userId, 
            string paymentIntentId, int? promotionId, IReadOnlyList<OrderItem> orderItems)
        {
            OrderTypeId = orderTypeId;
            SubTotal = subtotal;
            CustomerId = customerId;
            UserId = userId;
            PaymentIntentId = paymentIntentId;
            PromotionId = promotionId;
            OrderItems = orderItems;
        }
        [Column(TypeName = "datetime")]
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        [OrderStatus(ErrorMessage = "Invalid Order Status")]
        [Column(TypeName = "varchar(50)")]
        public string Status { get; set; } = "Pending";
        [Required]
        public int OrderTypeId { get; set; }
        public OrderType OrderType { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal SubTotal {  get; set; }
        [Required]
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        [Required]
        public int UserId { get; set; }
        public User User { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string PaymentIntentId { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        public int? PromotionId { get; set; }
        public Promotion Promotion { get; set; }

        // Later changed due to Promotion and Membership benefits
        public decimal? GetTotal()
        {
            if (PromotionId == null) return SubTotal;   
            return SubTotal - (SubTotal * (Promotion.Discount/100));
        }
    }
}
