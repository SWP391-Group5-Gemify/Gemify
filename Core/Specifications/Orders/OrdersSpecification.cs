using Core.Enitities.OrderAggregate;
using Core.Specifications.Products;
using Microsoft.EntityFrameworkCore;

namespace Core.Specifications.Orders
{
    public class OrdersSpecification : BaseSpecification<Order>
    {
        public OrdersSpecification(OrderSpecParams orderSpecParams)
            : base(o => 
                ((string.IsNullOrEmpty(orderSpecParams.Search) 
                || o.Customer.Phone.Contains(orderSpecParams.Search)
                || o.Customer.Name.ToLower().Contains(orderSpecParams.Search))
                && ((!orderSpecParams.OrderTypeId.HasValue) 
                || o.OrderTypeId == orderSpecParams.OrderTypeId))
            )
        {
            AddInclude(o => o.User);
            AddInclude(o => o.Promotion);
            AddInclude(o => o.OrderType);
            AddCustomInclude(q => q.Include(o => o.Customer).ThenInclude(oi => oi.Membership));
            AddCustomInclude(q => q.Include(o => o.OrderItems).ThenInclude(oi => oi.OrderItemGems));
            AddOrderByDescending(o => o.OrderDate);
            ApplyPaging(orderSpecParams.PageSize * (orderSpecParams.PageIndex - 1),
                orderSpecParams.PageSize);
        }

        public OrdersSpecification(int id)
            : base(o => o.Id == id)
        {
            AddInclude(o => o.User);
            AddInclude(o => o.Promotion);
            AddInclude(o => o.OrderType);
            AddCustomInclude(q => q.Include(o => o.OrderItems).ThenInclude(oi => oi.OrderItemGems));
            AddCustomInclude(q => q.Include(o => o.Customer).ThenInclude(oi => oi.Membership));
        }
    }
}
