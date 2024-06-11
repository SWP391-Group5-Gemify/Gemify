using Core.Enitities.OrderAggregate;

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
            AddInclude(o => o.OrderItems);
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrdersSpecification(int id)
            : base(o => o.Id == id)
        {
            AddInclude(o => o.Customer);
            AddInclude(o => o.OrderItems);
        }
    }
}
