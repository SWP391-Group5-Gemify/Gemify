using Core.Enitities;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Orders;
using Infrastructure.Data;
using Microsoft.IdentityModel.Tokens;
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
        public async Task<Order> CreateSalesOrderAsync(string basketId, int customerId, int userId)
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
                    var gemItemOrdered = new ProductGemsItemOrdered(gem.Name, gem.Color, productGem.GemWeight, 
                        gem.LatestPrice, gem.Carat, gem.Clarity, productGem.CertificateCode);
                    var orderItemGem = new OrderItemGem(gemItemOrdered, gem.LatestPrice, productGem.Quantity);
                    orderItemGems.Add(orderItemGem);
                }

                var gemPrice = orderItemGems.Aggregate(0m, (acc, g) => acc + (g.Price * g.Quantity));

                // Calculate the total price of the product
                // Product price = (gold weight * bid price) + labour + (gem price * quantity)
                var itemPrice = productItem.CalculateGoldBidPrice() + productItem.Labour + gemPrice;

                var orderItem = new OrderItem(itemOrdered, itemPrice, item.Quantity, orderItemGems);

                items.Add(orderItem);
            }

            // Calculate subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);

            // Create Order
            var order = new Order(basket.OrderTypeId, subtotal, customerId, userId, basket.PaymentIntentId, basket.PromotionId, items);
            _unitOfWork.Repository<Order>().Add(order);

            // Save Changes to the database
            var result = await _unitOfWork.Complete();

            if (result <= 0) return null;

            // Return the order
            var orderSpec = new OrdersSpecification(order.Id);
            order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(orderSpec);
            return order;
        }




        /**
         * =================================
         *         CREATE BUYBACK ORDER
         * =================================
        **/
        public async Task<Order> CreateBuyBackOrderAsync(string basketId, int customerId, int repurchaserId)
        {
            // total price
            decimal totalPrice = 0;

            // get basket
            var basket = await _basketRepo.GetBasketAsync(basketId);

            // add items in basket
            List<OrderItem> orderItemList = new List<OrderItem>();
            if (basket != null)
            {
                foreach (var item in basket.Items)
                {

                    var orderItem = await _unitOfWork.Repository<OrderItem>().GetByIdAsync(item.Id);
                    var product = await _unitOfWork.Repository<Product>().GetEntityWithSpec
                        (new ProductSpecification(orderItem.ItemOrdered.ProductItemId));

                    // calculate purchase gold price
                    var purchaseGoldPrice = product.CalculateGoldAskPrice();
                    orderItem.ItemOrdered.GoldPrice = purchaseGoldPrice;

                    // calculate purchase gem price
                    decimal totalPurchaseGemPrice = 0;
                    if (!orderItem.OrderItemGems.IsNullOrEmpty())
                    {
                        foreach (var gem in orderItem.OrderItemGems)
                        {
                            gem.Price /= (decimal)0.7;
                            gem.GemsItemOrdered.GemPrice /= (decimal)0.7;
                            totalPurchaseGemPrice += gem.Price;
                        }
                    }
                    
                    // calculate total purchase product price
                    orderItem.Price = orderItem.ItemOrdered.GoldPrice + totalPurchaseGemPrice;

                    // calculate total order price
                    totalPrice += orderItem.Price;

                    // add order item to order
                    orderItemList.Add(orderItem);
                }
            }

            // create purchase order

            var order = new Order(basket.OrderTypeId, totalPrice, customerId, repurchaserId, basket.PaymentIntentId, null, orderItemList);
            _unitOfWork.Repository<Order>().Add(order);

            // save to db
            var result = await _unitOfWork.Complete();
            if (result <= 0) return null;

            // Return the order
            var orderSpec = new OrdersSpecification(order.Id);
            order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(orderSpec);
            return order;
        }

        /* Test */
        public async Task<decimal> CalculatePurchaseGemPrice (int salesOrderId, int productId)
        {
            decimal result = 0;
            var salesOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpec(new OrdersSpecification(salesOrderId));
            foreach(var item in salesOrder.OrderItems)
            {
                if (item.Id == productId && !item.OrderItemGems.IsNullOrEmpty())
                {
                   foreach (var gem in item.OrderItemGems)
                    {
                        result += gem.Price;
                    }
                    result /= (decimal) 0.7;
                }
            }
            return result;
        }


        public async Task<Order> GetOrderByIdAsync(int id)
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
