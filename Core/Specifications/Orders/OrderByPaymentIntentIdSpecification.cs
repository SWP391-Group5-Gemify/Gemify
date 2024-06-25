using Core.Enitities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace Core.Specifications.Orders
{
    public class OrderByPaymentIntentIdSpecification : BaseSpecification<Order>
    {
        public OrderByPaymentIntentIdSpecification(string paymentIntentId) 
            : base(o => paymentIntentId != null && o.PaymentIntentId == paymentIntentId)
        {
            AddInclude(o => o.Membership);
            AddInclude(o => o.Promotion);
            AddInclude(o => o.OrderItems);
        }
    }
}
