using Core.Enitities.OrderAggregate;

namespace Core.Specifications.Orders
{
    public class OrderWithFilterForCountSpecification : BaseSpecification<Order>
    {
        public OrderWithFilterForCountSpecification(OrderSpecParams orderSpecParams)
            : base(x => string.IsNullOrEmpty(orderSpecParams.Search)
            || x.Customer.Name.ToLower().Contains(orderSpecParams.Search)
            || x.Customer.Phone.ToLower().Contains(orderSpecParams.Search)
            )
        {

        }
    }
}