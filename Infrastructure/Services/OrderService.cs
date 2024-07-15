using Core.Enitities;
using Core.Enitities.Identity;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Orders;
using Core.Specifications.Products;
using Microsoft.AspNetCore.Http.Features;
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

        public async Task<OrderItem> CreateSalesOrderItem(BasketItem item)
        {
            var productSpec = new ProductSpecification(item.Id);
            var productItem = await _unitOfWork.Repository<Product>().GetEntityWithSpec(productSpec);

            // Check if quantity is below 0 after selling products
            var remainingProductQuantity = productItem.Quantity - item.Quantity;
            var remainingCounterQuantity = productItem.SaleCounter.ProductQuantity - item.Quantity;
            if (remainingProductQuantity < 0 || remainingCounterQuantity < 0)
            {
                return null;
            }

            var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.GoldType.LatestBidPrice, productItem.GoldTypeId, 
                productItem.GoldType.Name, productItem.GoldWeight, productItem.Labour, productItem.GoldType.Unit,
                productItem.TotalWeight, productItem.ImageUrl, productItem.SaleCounterId, productItem.SaleCounter.Name);

            // Calculate the total price of all of the gems on a product
            var productGems = productItem.ProductGems;
            var orderItemGems = new List<OrderItemGem>();

            foreach (var productGem in productGems)
            {
                var gem = productGem.GemType;
                var gemItemOrdered = new ProductGemsItemOrdered(gem.Name, gem.Color, productGem.GemWeight,
                    gem.LatestPrice, gem.Carat, gem.Clarity, productGem.CertificateCode, gem.IsProcurable);
                var orderItemGem = new OrderItemGem(gemItemOrdered, gem.LatestPrice, productGem.Quantity);
                orderItemGems.Add(orderItemGem);
            }

            var gemPrice = orderItemGems.Aggregate(0m, (acc, g) => acc + (g.Price * g.Quantity));

            // Calculate the total price of the product
            // Product price = (gold weight * bid price) + labour + (list of (gem price * quantity))
            var itemPrice = productItem.CalculateGoldBidPrice() + productItem.Labour + gemPrice;

            var orderItem = new OrderItem(itemOrdered, itemPrice, item.Quantity, orderItemGems);

            return orderItem;
        }

        /**
         * Create buy-back order item does not belong to the store
         */
        public async Task<OrderItem> CreateBuybackOrderItemNotBelongToStore(BasketBuybackItem item)
        {
            var oldProduct = new Product
            {
                Name = item.ProductName,
                GoldTypeId = item.GoldTypeId,
                GoldWeight = item.GoldWeight,
                TotalWeight = item.GoldWeight,
                Quantity = 1,
                Status = ProductStatus.Old.GetEnumMemberValue(),
                SubCategoryId = item.SubCategoryId,
            };
            _unitOfWork.Repository<Product>().Add(oldProduct);
            await _unitOfWork.Complete();
            oldProduct = await _unitOfWork.Repository<Product>().GetEntityWithSpec(new ProductSpecification(oldProduct.Id));

            var itemOrdered = new ProductItemOrdered(oldProduct.Id, oldProduct.Name, -oldProduct.GoldType.LatestAskPrice, oldProduct.GoldTypeId, oldProduct.GoldType.Name,
                oldProduct.GoldWeight, oldProduct.Labour, oldProduct.SubCategory.Unit, oldProduct.TotalWeight, oldProduct.ImageUrl, oldProduct.SaleCounterId, null);
            return new OrderItem(itemOrdered, -oldProduct.CalculateGoldAskPrice(), item.Quantity, null);
        }
        
        /**
         * Create buy-back order item belongs to the store
         */
        public async Task<OrderItem> CreateBuybackOrderItem(BasketBuybackItem item)
        {
            // get orderItem based on orderItemId in basketItem
            var orderItem = await _unitOfWork.Repository<OrderItem>().GetEntityWithSpec(
                new OrderItemSpecification(item.Id)) ?? throw new Exception($"orderItem with ID {item.Id} not found.");
            var product = await _unitOfWork.Repository<Product>().GetEntityWithSpec(
                new ProductSpecification(orderItem.ItemOrdered.ProductItemId));

            var buyBackOrderItem = orderItem.Clone();
            if (buyBackOrderItem.OrderItemGems != null && buyBackOrderItem.OrderItemGems.Any())
            {
                for (var i = 0; i < buyBackOrderItem.OrderItemGems.Count; i++)
                {
                    var pg = buyBackOrderItem.OrderItemGems[i];
                    if (pg.GemsItemOrdered.IsProcurable)
                    {
                        // calculate purchase gem price
                        pg.GemsItemOrdered.GemPrice *= -0.7m;
                        pg.Price *= -0.7m;
                    }
                    else
                    {
                        buyBackOrderItem.OrderItemGems.RemoveAt(i);
                        i--;
                    }
                }
            }
            // labour = 0
            buyBackOrderItem.ItemOrdered.ProductLabour = 0;
            //calculate purchase gold price
            buyBackOrderItem.ItemOrdered.GoldPrice = -product.GoldType.LatestAskPrice;
            // reset goldWeight
            buyBackOrderItem.ItemOrdered.GoldWeight = item.GoldWeight;
            // calculate buy back item price
            buyBackOrderItem.Price = buyBackOrderItem.CalculateOrderItemPrice();
            // set quantity of buy-back item
            buyBackOrderItem.Quantity = item.Quantity;

            return buyBackOrderItem;
        }

        public async Task<OrderItem> CreateExchangeOrderItem(BasketBuybackItem item)
        {
            // get orderItem based on orderItemId in item
            var orderItem = await _unitOfWork.Repository<OrderItem>().GetEntityWithSpec(
                new OrderItemSpecification(item.Id)) ?? throw new Exception($"orderItem with ID {item.Id} not found.");

            // check whether sales_order was applied promotion
            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(
                new OrdersSpecification(orderItem.OrderId));
            if (order.PromotionId != null) throw new Exception("Sales order with promotion applied will not be exchanged!");

            var exchangeOrderItem = orderItem.Clone();
            if (exchangeOrderItem.OrderItemGems != null && exchangeOrderItem.OrderItemGems.Any())
            {
                // calculate purchase gem price
                foreach (var pg in exchangeOrderItem.OrderItemGems)
                {
                    pg.GemsItemOrdered.GemPrice = -pg.GemsItemOrdered.GemPrice;
                    pg.Price = -pg.Price;
                }
            }
            // labour 
            exchangeOrderItem.ItemOrdered.ProductLabour = -exchangeOrderItem.ItemOrdered.ProductLabour;
            //calculate gold price
            exchangeOrderItem.ItemOrdered.GoldPrice = -exchangeOrderItem.ItemOrdered.GoldPrice;

            // set quantity of exchanged item
            exchangeOrderItem.Quantity = item.Quantity;

            // calculate buy back item price
            exchangeOrderItem.Price = exchangeOrderItem.CalculateOrderItemPrice();

            return exchangeOrderItem;
        }

        public async Task<Order> CreateOrderAsync (CustomerBasket basket, int customerId, int userId, decimal subtotal, List<OrderItem> items)
        {
            // Check if the order exists with a payment intent id
            var orderSpec = new OrderByPaymentIntentIdSpecification(basket.PaymentIntentId);
            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(orderSpec);

            if (order != null)
            {
                order.CustomerId = customerId;
                order.UserId = userId;
                order.PromotionId = basket.PromotionId;
                order.MembershipId = basket.MembershipId;
                order.OrderTypeId = basket.OrderTypeId;
                order.SubTotal = subtotal;
                _unitOfWork.Repository<Order>().Update(order);
            }
            else
            {
                // Create Order
                order = new Order(basket.OrderTypeId, subtotal, customerId, userId,
                    basket.PaymentIntentId, basket.PromotionId, basket.MembershipId, items);
                _unitOfWork.Repository<Order>().Add(order);
            }

            // Save Changes to the database
            var result = await _unitOfWork.Complete();

            if (result <= 0) return null;

            // Return the order
            var orderToReturnSpec = new OrdersSpecification(order.Id);
            order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(orderToReturnSpec);
            return order;
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

            if (basket == null) return null;

            // Check if customer existed
            var customer = await _unitOfWork.Repository<Customer>().GetByIdAsync(customerId);

            if (customer == null) return null;

            // Get items from product repo to prevent client from tampering with price data
            var items = new List<OrderItem>();
            foreach (var item in basket.SaleItems)
            {
                var salesOrderItem = await CreateSalesOrderItem(item);
                if (salesOrderItem == null) return null;
                items.Add(salesOrderItem);
            }

            // Calculate subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);

            // Create sales order
            return await CreateOrderAsync(basket, customerId, userId, subtotal, items);
        }

        /**
         * =================================
         *         CREATE BUYBACK ORDER
         * =================================
        **/
        public async Task<Order> CreateBuyBackOrderAsync(string basketId, int customerId, int userId)
        {
            // get basket
            var basket = await _basketRepo.GetBasketAsync(basketId) ?? throw new Exception($"Basket with ID {basketId} not found.");
            if (basket == null) throw new ArgumentNullException(nameof(basket));
            basket.PromotionId = null;

            // create list of buy-back order items
            List<OrderItem> buybackItemList = new List<OrderItem>();

            foreach (var item in basket.BuybackItems)
            {
                OrderItem buybackOrderItem;
                if (item.Id == 0)
                {
                    buybackOrderItem = await CreateBuybackOrderItemNotBelongToStore(item);
                } else
                {
                    buybackOrderItem = await CreateBuybackOrderItem(item);
                }               
                buybackItemList.Add(buybackOrderItem);
            }

            // calculate subtotal of buyback item list
            var buybackSubtotal = buybackItemList.Sum(oi => oi.Price * oi.Quantity);

            // create buyback order
            var order = await CreateOrderAsync(basket, customerId, userId, buybackSubtotal, buybackItemList);
            order.Status = OrderStatus.PaymentReceived.GetEnumMemberValue();
            _unitOfWork.Repository<Order>().Update(order);
            await _unitOfWork.Complete();
            return order;
        }        

        /**
         * =================================
         *         CREATE EXCHANGE ORDER
         * =================================
        **/
        public async Task<Order> CreateExchangeOrderAsync(string basketId, int customerId, int userId)
        {
            // get basket
            var basket = await _basketRepo.GetBasketAsync(basketId) ?? throw new Exception($"Basket with ID {basketId} not found.");
            basket.PromotionId = null;

            List<OrderItem> saleItemList = new List<OrderItem>();

            List<OrderItem> exchangeItemList = new List<OrderItem>();

            List<OrderItem> orderItemList = new List<OrderItem>();

            // create a list of exchange order items           
            foreach (var item in basket.BuybackItems)
            {
                var exchangeOrderItem = await CreateExchangeOrderItem(item);
                exchangeItemList.Add(exchangeOrderItem);                    
            }

            // calculate subtotal of exchange item list
            var exchangeSubtotal = exchangeItemList.Sum(oi => oi.Price * oi.Quantity);

            // create a list of sales order items
            foreach (var item in basket.SaleItems)
            {
                var salesOrderItem = await CreateSalesOrderItem(item);
                if (salesOrderItem == null) return null;
                saleItemList.Add(salesOrderItem);
            }

            // calculate subtotal if sales item list
            var saleSubtotal = saleItemList.Sum(oi => oi.Price * oi.Quantity);

            // calculate subtotal in exchange order
            if (saleSubtotal < Math.Abs(exchangeSubtotal))
                exchangeSubtotal *= 0.7m;
            var subtotal = saleSubtotal + exchangeSubtotal;

            // create list of item in exchange order
            orderItemList = exchangeItemList.Concat(saleItemList).ToList();

            // If subtotal <= 30000 payment is not necessary, therefore order's payment succeeded
            if (subtotal <= 30000) {
                var order = await CreateOrderAsync(basket, customerId, userId, subtotal, orderItemList);
                order.Status = OrderStatus.PaymentReceived.GetEnumMemberValue();
                _unitOfWork.Repository<Order>().Update(order);
                await _unitOfWork.Complete();
                return order;
            }

            // create exchange order
            return await CreateOrderAsync(basket, customerId, userId, subtotal, orderItemList);
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

    }
}
