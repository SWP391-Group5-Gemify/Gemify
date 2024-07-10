using Core.Enitities;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications.Orders;
using Core.Specifications.Products;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Stripe;
using Customer = Core.Enitities.Customer;
using Product = Core.Enitities.Product;

namespace Infrastructure.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _config;

        public PaymentService(IBasketRepository basketRepository, IUnitOfWork unitOfWork, 
            IConfiguration config)
        {
            _basketRepository = basketRepository;
            _unitOfWork = unitOfWork;
            _config = config;
        }

        public async Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var basket = await _basketRepository.GetBasketAsync(basketId);

            if (basket == null)
            {
                return null;
            }

            var promotionDiscount = 0m;
            var membershipDiscount = 0m;

            // Retrieve Promotion Discount from the server for security
            if (basket.PromotionId.HasValue)
            {
                var promotion = await _unitOfWork.Repository<Promotion>().GetByIdAsync((int) basket.PromotionId);
                promotionDiscount = promotion.Discount;
            }

            // Retrieve Membership Discount from the server for security
            if (basket.MembershipId.HasValue)
            {
                var membership = await _unitOfWork.Repository<Membership>().GetByIdAsync((int)basket.MembershipId);
                membershipDiscount = membership.Discount;
            }

            // Calculate total discount
            var totalDiscount = promotionDiscount + membershipDiscount;

            // Update Sell prices for security
            await UpdateBasketSellItemPrice(basket);

            // Update Buyback prices for ssecurity
            await UpdateBasketBuybackItemPrice(basket);

            // CREATE OR UPDATE PAYMENT INTENT
            var service = new PaymentIntentService();

            PaymentIntent intent;

            // Calculate total amount
            var totalSellAmount = basket.SaleItems.Sum(i => i.Quantity * i.Price);
            var totalBuybackAmount = 0m;
            if (basket.BuybackItems.Any()) totalBuybackAmount = (long) basket.BuybackItems.Sum(i => i.Quantity * i.Price);

            // Exchange Service Fee
            long totalAmount = 0;

            // If the customers buy more than what they sell, they will be responsible for the outstanding amount
            if (totalBuybackAmount != 0 && totalBuybackAmount < totalSellAmount)
            {
                // If sell amount is greater than buyback amount the original price of the buyback item is calculated.
                totalAmount = (long) totalSellAmount - (long) (totalBuybackAmount);
            }
            else if (totalBuybackAmount > totalSellAmount)
            {
                // If sell amount is smaller than buyback amount 70% price of the buyback item is calculated.
                totalAmount = (long)(totalSellAmount) - (long)(totalBuybackAmount * 0.7m);
            }
            else if(totalBuybackAmount == 0)
            {
                // If this is a sale order (buyback price = 0), can apply coupons.
                totalAmount = (long)totalSellAmount - (long)(totalBuybackAmount);
                totalAmount = (long)(totalAmount - (totalAmount * totalDiscount));
            }

            /** 
             * If total amount > 99999999 stripe will return an error (Stripe allows maximum 8-digits)
             * If total amount < 50 cents (USD) stripe will also return an error.
             * The customer won't have to pay if the total amount is less than or equal to 30000 VND
            **/
            if (totalAmount > 99999999)
            {
                return null;
            }
            
            // The customer won't have to pay if the total amount is less than or equal to 30000 VND
            // No payment intent created
            if(totalAmount > 30000)
            {
                // Create payment intent if the basket is new
                if (string.IsNullOrEmpty(basket.PaymentIntentId))
                {
                    var options = new PaymentIntentCreateOptions
                    {
                        Amount = totalAmount,
                        Currency = "vnd",
                        PaymentMethodTypes = new List<string> { "card" }
                    };

                    intent = await service.CreateAsync(options);
                    basket.PaymentIntentId = intent.Id;
                    basket.ClientSecret = intent.ClientSecret;
                }
                else
                {
                    // Update payment intent if a payment intent already created
                    // with this basket and user decides to pick new items
                    var options = new PaymentIntentUpdateOptions
                    {
                        Amount = totalAmount
                    };
                    await service.UpdateAsync(basket.PaymentIntentId, options);
                }
            }

            await _basketRepository.UpdateBasketAsync(basket);

            return basket;
        }

        // Update sell prices of items in basket with prices from server
        public async Task UpdateBasketSellItemPrice(CustomerBasket basket)
        {
            foreach (var item in basket.SaleItems)
            {
                // Get product price and gem pricefrom server
                var spec = new ProductSpecification(item.Id);
                var saleItems = await _unitOfWork.Repository<Product>().GetEntityWithSpec(spec);

                var gemPrice = saleItems.ProductGems.Aggregate(
                    0m, 
                    (acc, g) => acc + (g.GemType.LatestPrice * g.Quantity)
                );

                // Calculate the total price of the product
                // Product price = (gold weight * bid price) + labour + (list of (gem price * quantity))
                var itemPrice = saleItems.CalculateGoldBidPrice() + saleItems.Labour + gemPrice;

                if (item.Price != itemPrice)
                {
                    item.Price = itemPrice;
                }
            }
        }

        // Update buyback prices of items in basket with prices from server
        public async Task UpdateBasketBuybackItemPrice(CustomerBasket basket)
        {
            foreach (var item in basket.BuybackItems)
            {
                var orderItem = await _unitOfWork.Repository<OrderItem>().GetEntityWithSpec(
                new OrderItemSpecification(item.Id));
                if (orderItem == null) return;
                var product = await _unitOfWork.Repository<Product>().GetEntityWithSpec(
                    new ProductSpecification(orderItem.ItemOrdered.ProductItemId));

                // Initialize product price with gold ask price * gold weight
                var buybackProductPrice = product.GoldType.LatestAskPrice * item.GoldWeight;

                // Calculate total product price for each gem
                buybackProductPrice = orderItem.OrderItemGems.Aggregate(
                    buybackProductPrice, 
                    (acc, g) => acc + g.Price * 0.7m * g.Quantity
                );

                if (item.Price != buybackProductPrice)
                {
                    item.Price = buybackProductPrice;
                }
            }
        }

        // Update Succeed Payment Status Received from Stripe
        public async Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId)
        {
            var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            if (order == null) return null;

            // Perform business logic updates
            await OrderSuccessBusinessLogicUpdate(order);

            // Update OrderStatus
            order.Status = OrderStatus.PaymentReceived.GetEnumMemberValue();
            await _unitOfWork.Complete();

            return order;
        }

        // Update Failed Payment Status Received from Stripe
        public async Task<Order> UpdateOrderPaymentFailed(string paymentIntentId)
        {
            var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            if (order == null) return null;

            order.Status = OrderStatus.PaymentFailed.GetEnumMemberValue();
            await _unitOfWork.Complete();

            return order;
        }

        // Perform business logics update on customer, products, and sale counters when order status is succeeded
        public async Task OrderSuccessBusinessLogicUpdate(Order order) {
            // Update Customer Membership status
            var point = (int) order.GetTotal() / 100000;
            var customer = await _unitOfWork.Repository<Customer>().GetByIdAsync(order.CustomerId);
            customer.Point += point;
            var memberships = await _unitOfWork.Repository<Membership>().ListAllAsync();
            var sortedMemberships = memberships.OrderBy(m => m.MinPoint);

            // Find the next Membership status the customer achieved based on loyalty points.
            foreach (var membership in sortedMemberships)
            {
                if (customer.Point >= membership.MinPoint)
                {
                    customer.MembershipId = membership.Id;
                }
                else break;
            }

            // Update Product's Quantity and Counter's Quantity
            foreach (var orderItem in order.OrderItems)
            {
                if (orderItem.Price < 0) continue;
                var productSpec = new ProductSpecification(orderItem.ItemOrdered.ProductItemId);
                var product = await _unitOfWork.Repository<Product>().GetEntityWithSpec(productSpec);

                product.Quantity = product.Quantity - orderItem.Quantity;
                product.SaleCounter.ProductQuantity = product.SaleCounter.ProductQuantity - orderItem.Quantity;

                if (product.Quantity == 0)
                {
                    product.Status = ProductStatus.Unavailable.ToString();
                }
            }
        }
    }
}
