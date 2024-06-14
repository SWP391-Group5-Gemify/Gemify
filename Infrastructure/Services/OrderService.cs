using Core.Enitities;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Orders;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;

        public OrderService(IBasketRepository basketRepo, IUnitOfWork unitOfWork)
        {
            _basketRepo = basketRepo;
            _unitOfWork = unitOfWork;
        }

        /**
         * =================================
         *         CREATE SALES ORDER
         * =================================
        **/
        public Task<Order> CreateSalesOrderAsync(int customerId, string basketId)
<<<<<<< HEAD
        { 
=======
        {
            // Get basket from redis database
             // var basket = await _basketRepo.GetBasketAsync(basketId);

            // Get items from product repo to prevent client from tampering with price data
            /** var items = new List<OrderItem>();
            foreach(var item in basket.Items)
            {
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.GoldType.LatestBidPrice, 
                    productItem.GoldType.Name, productItem.GoldWeight, productItem.Labour, productItem.GoldType.Unit, 
                    productItem.TotalWeight, productItem.ImageUrl);

                var orderItem = new OrderItem(itemOrdered, )
            }
            **/
>>>>>>> d150b75fb2761fc3ccfe61ef3e286a1f0e05bf80
            throw new NotImplementedException();
            // product price = goldweight*bidprice + labour + gemprice*quantity
            // order total = total*promotion
        }




        /**
         * =================================
         *         CREATE BUYBACK ORDER
         * =================================
        **/
        public Task<Order> CreateBuyBackOrderAsync()
        {
            throw new NotImplementedException();
        }


        public async Task<Order> GetOrderByIdAsync(int id)
        {
            var spec = new OrdersSpecification(id);
            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

<<<<<<< HEAD
        public async Task<OrderItem> GetOrderItemByIdAsync(int id) {
            return await _unitOfWork.Repository<OrderItem>().GetByIdAsync(id);
        }

=======
>>>>>>> d150b75fb2761fc3ccfe61ef3e286a1f0e05bf80
        public async Task<IReadOnlyList<Order>> GetOrdersAsync(OrdersSpecification ordersSpec)
        {
            return await _unitOfWork.Repository<Order>().ListAsync(ordersSpec);              
        }

        public async Task<int> CountOrdersWithSpecAsync(ISpecification<Order> spec)
        {
            return await _unitOfWork.Repository<Order>().CountAsync(spec);
        }
    }
}
