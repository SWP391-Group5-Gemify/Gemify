using Core.Enitities;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Orders;
using Core.Specifications.Products;
using Microsoft.EntityFrameworkCore;

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
        public async Task<int?> CreateSalesOrderAsync(string basketId, int customerId, int userId)
        {
            // Get basket from redis database
            var basket = await _basketRepo.GetBasketAsync(basketId);

            // Get items from product repo to prevent client from tampering with price data
            var items = new List<OrderItem>();
            foreach(var item in basket.Items)
            {
                var spec = new ProductSpecification(item.Id);
                var productItem = await _unitOfWork.Repository<Product>().GetEntityWithSpec(spec);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.GoldType.LatestBidPrice, 
                    productItem.GoldType.Name, productItem.GoldWeight, productItem.Labour, productItem.GoldType.Unit, 
                    productItem.TotalWeight, productItem.ImageUrl);

                // Calculate the total price of all of the gems on a product
                var productGems = productItem.ProductGems;
                var orderItemGems = new List<OrderItemGem>();

                foreach(var productGem in productGems)
                {
                    var gem = productGem.GemType;
                    var gemItemOrdered = new ProductGemsItemOrdered(gem.Name, gem.Color, productGem.GemWeight, gem.Carat, 
                        gem.LatestPrice, gem.Clarity, productGem.CertificateCode);
                    var orderItemGem = new OrderItemGem(gemItemOrdered, gem.LatestPrice, productGem.Quantity);
                    orderItemGems.Add(orderItemGem);
                }

                var gemPrice = orderItemGems.Aggregate(0m, (acc, g) => acc + (g.Price * g.Quantity));

                // Calculate the total price of the product
                // Product price = (gold weight * bid price) + labour + (gem price * quantity)
                var itemPrice = (productItem.GoldWeight * productItem.GoldType.LatestBidPrice) + productItem.Labour + gemPrice;

                var orderItem = new OrderItem(itemOrdered, itemPrice, item.Quantity, orderItemGems);

                items.Add(orderItem);
            }

            // Calculate subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);

            // Create Order
            var order = new Order(basket.OrderTypeId, subtotal, customerId, userId, basket.PaymentIntentId, 1, items);
            _unitOfWork.Repository<Order>().Add(order);

            // Save Changes to the database
            var result = await _unitOfWork.Complete();

            if (result <= 0) return null;

            // Return the order
            return order.Id;
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


        public async Task<Order> GetOrderByIdAsync(int? id)
        {
            var spec = new OrdersSpecification(id);
            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
            if(order == null) return null;
            return order;
        }

        public async Task<IReadOnlyList<Order>> GetOrdersAsync(OrdersSpecification ordersSpec)
        {
            var orders = await _unitOfWork.Repository<Order>().ListAsync(ordersSpec);              
            return orders;
        }

        public async Task<int> CountOrdersWithSpecAsync(ISpecification<Order> spec)
        {
            return await _unitOfWork.Repository<Order>().CountAsync(spec);
        }
    }
}
