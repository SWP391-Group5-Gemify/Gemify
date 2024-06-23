using Core.Enitities;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications.Orders;
using Core.Specifications.Products;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Stripe;
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
            
            // Retrieve Promotion Discount from the server for security
            if(basket.PromotionId.HasValue)
            {
                var promotion = await _unitOfWork.Repository<Promotion>().GetByIdAsync((int) basket.PromotionId);
                promotionDiscount = promotion.Discount;
            }

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
            long totalAmount = 30000;

            // If the customers buy more than what they sell, they will be responsible for the outstanding amount
            if (totalBuybackAmount < totalSellAmount)
            {
                totalAmount = ((long)(totalSellAmount)) - ((long)(totalSellAmount * promotionDiscount)) -
                    ((long)totalBuybackAmount);
            }

            // If total amount > 99999999 stripe will return an error (Stripe allows maximum 8-digits)
            if(totalAmount > 99999999)
            {
                return null;
            }

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
            // Calculate Price for buyback items
            var buybackPriceTotal = 0m;

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

                // Add product price to total Buyback price
                buybackPriceTotal += buybackProductPrice * item.Quantity;

                if (item.Price != buybackPriceTotal)
                {
                    item.Price = buybackPriceTotal;
                }
            }
        }
    }
}
