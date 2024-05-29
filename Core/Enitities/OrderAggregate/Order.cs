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
        public Order(DateTime orderDate, int orderTypeId, 
            decimal total, int customerId, string userId, int receiptId, 
            string paymentIntentId, IReadOnlyList<OrderItem> orderItems)
        {
            OrderDate = orderDate;
            OrderTypeId = orderTypeId;
            Total = total;
            CustomerId = customerId;
            UserId = userId;
            ReceiptId = receiptId;
            PaymentIntentId = paymentIntentId;
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
        public decimal Total {  get; set; }
        [Required]
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        [Required]
        public string UserId { get; set; }
        public User User { get; set; }
        public int ReceiptId { get; set; }
        public Receipt Receipt { get; set; }
        [Column(TypeName = "varchar(200)")]
        public string PaymentIntentId { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
    }
}
