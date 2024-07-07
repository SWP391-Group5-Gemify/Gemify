using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Enitities.OrderAggregate
{
    public class OrderItem : BaseEntity
    {
        public OrderItem() { }
        public OrderItem(ProductItemOrdered itemOrdered, decimal price, int quantity, IList<OrderItemGem> orderItemGems)
        {
            ItemOrdered = itemOrdered;
            Price = price;
            Quantity = quantity;
            OrderItemGems = orderItemGems;
        }
        public int OrderId { get; set; }
        public ProductItemOrdered ItemOrdered { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public IList<OrderItemGem> OrderItemGems { get; set; }

        public OrderItem Clone()
        {
            List<OrderItemGem> orderItemGemsClone = new List<OrderItemGem>();
            foreach (var oig in OrderItemGems)
            {
                orderItemGemsClone.Add(oig.Clone());
            }
            return new OrderItem(ItemOrdered.Clone(), Price, Quantity, orderItemGemsClone);
        }

        public decimal CalculateOrderItemPrice ()
        {
            return (decimal) OrderItemGems
                .Aggregate(ItemOrdered.GoldPrice * ItemOrdered.GoldWeight + ItemOrdered.ProductLabour,
                (acc, g) => acc + g.Price * g.Quantity);
        }
    }
}
