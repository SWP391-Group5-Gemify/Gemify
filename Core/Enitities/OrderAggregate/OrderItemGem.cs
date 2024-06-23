using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Enitities.OrderAggregate
{
    public class OrderItemGem : BaseEntity
    {
        public OrderItemGem() { }

        public OrderItemGem(ProductGemsItemOrdered gemsItemOrdered, decimal price, int quantity)
        {
            GemsItemOrdered = gemsItemOrdered;
            Price = price;
            Quantity = quantity;
        }

        public ProductGemsItemOrdered GemsItemOrdered { get; set; }

        [Column(TypeName = "decimal(18, 0)")]
        public decimal Price { get; set; }

        public int Quantity { get; set; }
    }
}
