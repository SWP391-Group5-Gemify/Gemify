using Core.Enitities.OrderAggregate;
using Core.Specifications.Orders;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateSalesOrderAsync(int customerId, string basketId);
        Task<Order> CreateBuyBackOrderAsync();
        Task<IReadOnlyList<Order>> GetOrdersAsync(OrdersSpecification ordersSpec);
        Task<Order> GetOrderByIdAsync(int id);

        Task<OrderItem> GetOrderItemByIdAsync(int id);
    }
}
