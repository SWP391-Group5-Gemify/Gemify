using Core.Enitities;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Customers;
using Core.Specifications.Orders;
using Infrastructure.Data;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly BasketRepository _basketRepository;

        public OrderService(IUnitOfWork unitOfWork, BasketRepository basketRepository)
        {
            _unitOfWork = unitOfWork;
            _basketRepository = basketRepository;
        }

        /**
         * =================================
         *         CREATE SALES ORDER
         * =================================
        **/
        public Task<Order> CreateSalesOrderAsync()
        {
            throw new NotImplementedException();
        }


        /**
         * =================================
         *         CREATE BUYBACK ORDER
         * =================================
        **/
        public async Task<Order> CreateBuyBackOrderAsync(string basketId, int customerId, int repurchaserId)
        {
            // add customer (if not exist)
            var customer = _unitOfWork.Repository<Customer>().GetByIdAsync(customerId);

            // get basket
            var basket = await _basketRepository.GetBasketAsync(basketId);

            // add items in basket
            List<Product> productList = new List<Product>();
            if (basket != null)
            {
                foreach (var item in basket.Items)
                {
                    var product = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);

                    var itemOrdered = new ProductItemOrdered(product.Id, product.Name, 0, product.GoldType.Name, product.GoldWeight
                        , 0, product.SubCategory.Unit, product.ImageUrl);
                    var orderItem = new OrderItem(itemOrdered, 0, 1);

                    productList.Add(product);
                }
            }
        }


        public async Task<Order> GetOrderByIdAsync(int id)
        {
            var spec = new OrdersSpecification(id);
            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersAsync(OrdersSpecification ordersSpec)
        {
            return await _unitOfWork.Repository<Order>().ListAsync(ordersSpec);  
        }
    }
}
