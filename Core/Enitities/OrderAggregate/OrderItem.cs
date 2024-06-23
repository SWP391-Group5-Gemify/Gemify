using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Enitities.OrderAggregate
{
    public class OrderItem : BaseEntity
    {
        public OrderItem() { }
        public OrderItem(ProductItemOrdered itemOrdered, decimal price, int quantity, IReadOnlyList<OrderItemGem> orderItemGems)
        {
            ItemOrdered = itemOrdered;
            Price = price;
            Quantity = quantity;
            OrderItemGems = orderItemGems;
        }

        public ProductItemOrdered ItemOrdered { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public IReadOnlyList<OrderItemGem> OrderItemGems { get; set; }
    }
}
