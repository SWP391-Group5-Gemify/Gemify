using Core.Enitities.OrderAggregate;
using Core.Specifications.Orders;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateSalesOrderAsync();
        Task<Order> CreateBuyBackOrderAsync();
        Task<IReadOnlyList<Order>> GetOrdersAsync(OrdersSpecification ordersSpec);
        Task<Order> GetOrderByIdAsync(int id);
        Task<int> CountOrdersWithSpecAsync(ISpecification<Order> spec);
    }
}
