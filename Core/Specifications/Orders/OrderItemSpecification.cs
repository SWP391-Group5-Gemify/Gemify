
using Core.Enitities.OrderAggregate;

namespace Core.Specifications.Orders
{
    public class OrderItemSpecification : BaseSpecification<OrderItem>
    {
        public OrderItemSpecification(int id)
            : base(o => o.Id == id)
        {
            AddInclude(o => o.OrderItemGems);
        }
    }
}
