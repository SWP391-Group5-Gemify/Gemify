using System.ComponentModel.DataAnnotations;

namespace Core.Enitities.OrderAggregate
{
    public class OrderItemGem : BaseEntity
    {
        public OrderItemGem() { }

        public OrderItemGem(int orderItemId, ProductGemsItemOrdered gemsItemOrdered)
        {
            OrderItemId = orderItemId;
            GemsItemOrdered = gemsItemOrdered;
        }

        [Required]
        public int OrderItemId { get; set; }
        public OrderItem OrderItem { get; set; }
        public ProductGemsItemOrdered GemsItemOrdered { get; set; }
    }
}
