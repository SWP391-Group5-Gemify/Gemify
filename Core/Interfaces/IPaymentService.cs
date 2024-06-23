using Core.Enitities;
using Core.Enitities.OrderAggregate;

namespace Core.Interfaces
{
    public interface IPaymentService
    {
        Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId);

        Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId);

        Task<Order> UpdateOrderPaymentFailed(string paymentIntentId);
    }
}
