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
            foreach (var item in basket.SaleItems)
            {
                var spec = new ProductSpecification(item.Id);
                var productItem = await _unitOfWork.Repository<Product>().GetEntityWithSpec(spec);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.GoldType.LatestBidPrice,
                    productItem.GoldType.Name, productItem.GoldWeight, productItem.Labour, productItem.GoldType.Unit,
                    productItem.TotalWeight, productItem.ImageUrl);

                // Calculate the total price of all of the gems on a product
                var productGems = productItem.ProductGems;
                var orderItemGems = new List<OrderItemGem>();

                foreach (var productGem in productGems)
                {
                    var gem = productGem.GemType;
                    var gemItemOrdered = new ProductGemsItemOrdered(gem.Name, gem.Color, productGem.GemWeight,
                        gem.LatestPrice, gem.Carat, gem.Clarity, productGem.CertificateCode);
                    var orderItemGem = new OrderItemGem(gemItemOrdered, gem.LatestPrice, productGem.Quantity);
                    orderItemGems.Add(orderItemGem);
                }

                var gemPrice = orderItemGems.Aggregate(0m, (acc, g) => acc + (g.Price * g.Quantity));

                // Calculate the total price of the product
                // Product price = (gold weight * bid price) + labour + (list of (gem price * quantity))
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
            // get basket
            var basket = await _basketRepo.GetBasketAsync(basketId);
            if (basket == null) return null;

            // add items in basket
            List<OrderItem> orderItemList = new List<OrderItem>();

            foreach (var item in basket.BuybackItems)
            {
                // get orderItem based on orderItemId in item
                var orderItem = await _unitOfWork.Repository<OrderItem>().GetEntityWithSpec(
                    new OrderItemSpecification(item.Id));
                if (orderItem == null) return null;
                var product = await _unitOfWork.Repository<Product>().GetEntityWithSpec(
                    new ProductSpecification(orderItem.ItemOrdered.ProductItemId));

                // create a list of buy-back order item gem
                var buyBackOrderItemGemList = new List<OrderItemGem>();
                if (orderItem.OrderItemGems != null && orderItem.OrderItemGems.Any())
                {
                    foreach (var pg in orderItem.OrderItemGems)
                    {
                        // create buy-back gem item ordered
                        var gemItemOrdered = pg.GemsItemOrdered;
                        var purchaseGemPrice = -gemItemOrdered.GemPrice * 0.7m;
                        var buyBackGemsItemOrdered = new ProductGemsItemOrdered(gemItemOrdered.GemName, gemItemOrdered.GemColor,
                            gemItemOrdered.GemWeight, purchaseGemPrice, gemItemOrdered.GemCarat, gemItemOrdered.GemClarity,
                            gemItemOrdered.GemCertificateCode);

                        // create buy-back order item gem
                        var buyBackOrderItemGem = new OrderItemGem(buyBackGemsItemOrdered, purchaseGemPrice, pg.Quantity);

                        buyBackOrderItemGemList.Add(buyBackOrderItemGem);
                    }
                }

                // get purchase gold price
                var purchaseGoldPrice = -product.GoldType.LatestAskPrice;
                // create item ordered
                var buyBackItemOrdered = new ProductItemOrdered(product.Id, product.Name, purchaseGoldPrice,
                product.GoldType.Name, item.GoldWeight, 0, product.GoldType.Unit,
                product.TotalWeight, product.ImageUrl);
                // calculate purchase product price
                var purchaseProductPrice = (decimal) buyBackOrderItemGemList
                    .Aggregate(buyBackItemOrdered.GoldPrice*buyBackItemOrdered.GoldWeight, (acc, g) => acc + g.Price*g.Quantity);
                // create buy-back order item
                var buyBackOrderItem = new OrderItem(buyBackItemOrdered, purchaseProductPrice, item.Quantity, buyBackOrderItemGemList);

                // add order item to order list
                orderItemList.Add(buyBackOrderItem);
            }

            // calculate total order price
            var subtotal = orderItemList.Sum(oi => oi.Price * oi.Quantity);

            // create purchase order
            var order = new Order(basket.OrderTypeId, subtotal, customerId, repurchaserId, null, null, orderItemList);
            _unitOfWork.Repository<Order>().Add(order);

            // save to db
            var result = await _unitOfWork.Complete();
            if (result <= 0) return null;

            // return order
            var orderSpec = new OrdersSpecification(order.Id);
            order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(orderSpec);
            return order;
        }

        public async Task<int> UpdateOrderAsync(Order order)
        {
            _unitOfWork.Repository<Order>().Update(order);
            return await _unitOfWork.Complete();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            var spec = new OrdersSpecification(id);
            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
            if (order == null) return null;
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

        public async Task<IReadOnlyList<OrderType>> GetOrderTypesAsync()
        {
            return await _unitOfWork.Repository<OrderType>().ListAllAsync();
        }

        public async Task<Order> CreateExchangeOrderAsync(string basketId, int customerId, int userId)
        {
            // get basket
            var basket = await _basketRepo.GetBasketAsync(basketId);
            if (basket == null) return null;

            // add sale items in basket
            List<OrderItem> saleItemList = new List<OrderItem>();

            // add buyback items in basket
            List<OrderItem> buybackItemList = new List<OrderItem>();

            List<OrderItem> orderItemList = new List<OrderItem>();

            foreach (var item in basket.BuybackItems)
            {
                // get orderItem based on orderItemId in item
                var orderItem = await _unitOfWork.Repository<OrderItem>().GetEntityWithSpec(
                    new OrderItemSpecification(item.Id));
                if (orderItem == null) return null;
                var product = await _unitOfWork.Repository<Product>().GetEntityWithSpec(
                    new ProductSpecification(orderItem.ItemOrdered.ProductItemId));

                // create a list of buy-back order item gem
                var buyBackOrderItemGemList = new List<OrderItemGem>();
                if (orderItem.OrderItemGems != null && orderItem.OrderItemGems.Any())
                {
                    foreach (var pg in orderItem.OrderItemGems)
                    {
                        // create buy-back gem item ordered
                        var gemItemOrdered = pg.GemsItemOrdered;
                        var purchaseGemPrice = -gemItemOrdered.GemPrice * 0.7m;
                        var buyBackGemsItemOrdered = new ProductGemsItemOrdered(gemItemOrdered.GemName, gemItemOrdered.GemColor,
                            gemItemOrdered.GemWeight, purchaseGemPrice, gemItemOrdered.GemCarat, gemItemOrdered.GemClarity,
                            gemItemOrdered.GemCertificateCode);

                        // create buy-back order item gem
                        var buyBackOrderItemGem = new OrderItemGem(buyBackGemsItemOrdered, purchaseGemPrice, pg.Quantity);

                        buyBackOrderItemGemList.Add(buyBackOrderItemGem);
                    }
                }

                // get purchase gold price
                var purchaseGoldPrice = -product.GoldType.LatestAskPrice;
                // create item ordered
                var buyBackItemOrdered = new ProductItemOrdered(product.Id, product.Name, purchaseGoldPrice,
                product.GoldType.Name, item.GoldWeight, 0, product.GoldType.Unit,
                product.TotalWeight, product.ImageUrl);
                // calculate purchase product price
                var purchaseProductPrice = (decimal)buyBackOrderItemGemList
                    .Aggregate(buyBackItemOrdered.GoldPrice * buyBackItemOrdered.GoldWeight, (acc, g) => acc + g.Price * g.Quantity);
                // create buy-back order item
                var buyBackOrderItem = new OrderItem(buyBackItemOrdered, purchaseProductPrice, item.Quantity, buyBackOrderItemGemList);

                // add order item to order list
                buybackItemList.Add(buyBackOrderItem);
                orderItemList.Add(buyBackOrderItem);
            }

            // calculate buyback total order price
            var buybackSubtotal = buybackItemList.Sum(oi => oi.Price * oi.Quantity);

            foreach (var item in basket.SaleItems)
            {
                var spec = new ProductSpecification(item.Id);
                var productItem = await _unitOfWork.Repository<Product>().GetEntityWithSpec(spec);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.GoldType.LatestBidPrice,
                    productItem.GoldType.Name, productItem.GoldWeight, productItem.Labour, productItem.GoldType.Unit,
                    productItem.TotalWeight, productItem.ImageUrl);

                // Calculate the total price of all of the gems on a product
                var productGems = productItem.ProductGems;
                var orderItemGems = new List<OrderItemGem>();

                foreach (var productGem in productGems)
                {
                    var gem = productGem.GemType;
                    var gemItemOrdered = new ProductGemsItemOrdered(gem.Name, gem.Color, productGem.GemWeight,
                        gem.LatestPrice, gem.Carat, gem.Clarity, productGem.CertificateCode);
                    var orderItemGem = new OrderItemGem(gemItemOrdered, gem.LatestPrice, productGem.Quantity);
                    orderItemGems.Add(orderItemGem);
                }

                var gemPrice = orderItemGems.Aggregate(0m, (acc, g) => acc + (g.Price * g.Quantity));

                // Calculate the total price of the product
                // Product price = (gold weight * bid price) + labour + (list of (gem price * quantity))
                var itemPrice = productItem.CalculateGoldBidPrice() + productItem.Labour + gemPrice;

                var orderItem = new OrderItem(itemOrdered, itemPrice, item.Quantity, orderItemGems);

                saleItemList.Add(orderItem);
                orderItemList.Add(orderItem);
            }

            // calculate buyback total order price
            var SaleSubtotal = saleItemList.Sum(oi => oi.Price * oi.Quantity);

            var subtotal = SaleSubtotal + buybackSubtotal;

            // create purchase order
            var order = new Order(basket.OrderTypeId, subtotal, customerId, userId, null, null, orderItemList);
            _unitOfWork.Repository<Order>().Add(order);

            // save to db
            var result = await _unitOfWork.Complete();
            if (result <= 0) return null;

            // return order
            var orderSpec = new OrdersSpecification(order.Id);
            order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(orderSpec);
            return order;
        }
    }
}
