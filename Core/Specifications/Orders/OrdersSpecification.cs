using Core.Enitities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace Core.Specifications.Orders
{
    public class OrdersSpecification : BaseSpecification<Order>
    {
        public OrdersSpecification(OrderSpecParams orderSpecParams)
            : base(o => 
                (string.IsNullOrEmpty(orderSpecParams.Search) 
                || o.Customer.Phone.Equals(orderSpecParams.Search)
                || o.Customer.Name.ToLower().Contains(orderSpecParams.Search))
            )
        {
            AddInclude(o => o.Customer);
            AddInclude(o => o.User);
            AddInclude(o => o.Promotion);
            AddInclude(o => o.OrderType);
            AddCustomInclude(q => q.Include(o => o.OrderItems).ThenInclude(oi => oi.OrderItemGems));
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrdersSpecification(int id)
            : base(o => o.Id == id)
        {
            AddInclude(o => o.Customer);
            AddInclude(o => o.User);
            AddInclude(o => o.Promotion);
            AddInclude(o => o.OrderType);
            AddCustomInclude(q => q.Include(o => o.OrderItems).ThenInclude(oi => oi.OrderItemGems));
        }
    }
}
