using Core.Enitities.OrderAggregate;
using Core.Enitities;
using Core.Specifications.Orders;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateSalesOrderAsync(string basketId, int customerId, int userId);
        Task<Order> CreateBuyBackOrderAsync(string basketId, int customerId, int repurchaserId);
        Task<IReadOnlyList<Order>> GetOrdersAsync(OrdersSpecification ordersSpec);
        Task<Order> GetOrderByIdAsync(int id);
        Task<int> CountOrdersWithSpecAsync(ISpecification<Order> spec);
    }
}
