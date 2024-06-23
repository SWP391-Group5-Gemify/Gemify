using Core.Enitities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace Core.Specifications.Orders
{
    public class OrderByPaymentIntentIdSpecification : BaseSpecification<Order>
    {
        public OrderByPaymentIntentIdSpecification(string paymentIntentId) 
            : base(o => o.PaymentIntentId == paymentIntentId)
        {
            AddInclude(o => o.OrderItems);
        }
    }
}
