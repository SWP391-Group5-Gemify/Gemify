using Core.Enitities.OrderAggregate;

namespace Core.Specifications.Orders
{
    public class OrderWithFilerForCountSpecification : BaseSpecification<Order>
    {
        public OrderWithFilerForCountSpecification(OrderSpecParams orderSpecParams)
            : base(x => string.IsNullOrEmpty(orderSpecParams.Search)
            || x.Customer.Name.ToLower().Contains(orderSpecParams.Search)
            || x.Customer.Phone.ToLower().Contains(orderSpecParams.Search)
            )
        {

        }
    }
}