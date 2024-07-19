using Core.Enitities.OrderAggregate;

namespace Core.Specifications.Orders
{
    public class OrderWithFilterForCountSpecification : BaseSpecification<Order>
    {
        public OrderWithFilterForCountSpecification(OrderSpecParams orderSpecParams)
            : base(o =>
                (string.IsNullOrEmpty(orderSpecParams.Search)
                || o.Customer.Phone.Contains(orderSpecParams.Search)
                || o.Customer.Name.ToLower().Contains(orderSpecParams.Search)
                || o.Id + "" == orderSpecParams.Search)
                && ((!orderSpecParams.OrderTypeId.HasValue)
                || o.OrderTypeId == orderSpecParams.OrderTypeId)
                && ((orderSpecParams.StartDate == null || orderSpecParams.EndDate == null)
                || o.OrderDate >= orderSpecParams.StartDate && o.OrderDate <= orderSpecParams.EndDate)
                && (string.IsNullOrEmpty(orderSpecParams.Status)
                || o.Status.Equals(orderSpecParams.Status)))
        {

        }
    }
}