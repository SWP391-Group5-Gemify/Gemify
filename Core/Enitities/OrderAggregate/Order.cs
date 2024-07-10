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
            string paymentIntentId, int? promotionId, int? membershipId, IReadOnlyList<OrderItem> orderItems)
        {
            OrderTypeId = orderTypeId;
            SubTotal = subtotal;
            CustomerId = customerId;
            UserId = userId;
            PaymentIntentId = paymentIntentId;
            PromotionId = promotionId;
            MembershipId = membershipId;
            OrderItems = orderItems;
        }
        [Column(TypeName = "datetime")]
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        [OrderStatus(ErrorMessage = "Invalid Order Status")]
        [Column(TypeName = "varchar(50)")]
        public string Status { get; set; } = OrderStatus.Pending.GetEnumMemberValue();
        [Required]
        public int OrderTypeId { get; set; }
        public OrderType OrderType { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
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
        public int? MembershipId { get; set; }
        public Membership Membership { get; set; }

        // Later changed due to Promotion and Membership benefits
        public decimal GetTotal()
        {
            var totalDiscount = 0m;
            // Only sales order is applied membership discount and promotion
            if (MembershipId != null && OrderType.Id == 1)
                totalDiscount += Membership.Discount;
            if (PromotionId != null && OrderType.Id == 1)
                totalDiscount += Promotion.Discount; 
            return SubTotal - (SubTotal * totalDiscount);
        }
    }
}
