using Core.Enitities.OrderAggregate;
using Core.Specifications.Orders;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateSalesOrderAsync(int customerId, string basketId);
        Task<Order> CreateBuyBackOrderAsync(string basketId, int customerId, int repurchaserId);
        Task<IReadOnlyList<Order>> GetOrdersAsync(OrdersSpecification ordersSpec);
        Task<Order> GetOrderByIdAsync(int id);
    }
}
