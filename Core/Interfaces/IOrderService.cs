using Core.Enitities.OrderAggregate;
using Core.Enitities;
using Core.Specifications.Orders;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateSalesOrderAsync(int customerId, string basketId);
        Task<Order> CreateBuyBackOrderAsync();
        Task<IReadOnlyList<Order>> GetOrdersAsync(OrdersSpecification ordersSpec);
        Task<Order> GetOrderByIdAsync(int id);
        Task<int> CountOrdersWithSpecAsync(ISpecification<Order> spec);
    }
}
