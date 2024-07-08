using Core.Enitities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace Core.Specifications.Orders
{
    public class OrderByPaymentIntentIdSpecification : BaseSpecification<Order>
    {
        public OrderByPaymentIntentIdSpecification(string paymentIntentId) 
            : base(o => !string.IsNullOrEmpty(paymentIntentId) && o.PaymentIntentId == paymentIntentId)
        {
            AddInclude(o => o.User);
            AddInclude(o => o.Promotion);
            AddInclude(o => o.Membership);
            AddInclude(o => o.OrderType);
            AddCustomInclude(q => q.Include(o => o.Customer).ThenInclude(oi => oi.Membership));
            AddCustomInclude(q => q.Include(o => o.OrderItems).ThenInclude(oi => oi.OrderItemGems));
        }
    }
}
