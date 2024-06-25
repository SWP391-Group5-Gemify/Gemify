using Core.Enitities;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Orders;
using Core.Specifications.Products;
using Infrastructure.Services;
using Moq;
using Stripe;
using System.Net.NetworkInformation;
using Customer = Core.Enitities.Customer;
using Product = Core.Enitities.Product;

namespace Gemify.Test
{
    public class OrderServiceTest
    {
        [Test]
        public async Task CreateSalesOrder_ShouldRerturnAnOrderObject_WhenOrderCreatedSuccessfully()
        {
            // Arrange
            var mockBasketRepo = new Mock<IBasketRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            // Create new basket items list
            var basketItemsList = new List<BasketItem>()
            {
                new BasketItem()
                {
                    Id = 1,
                    ProductName = "Product 1",
                    Price = 10.0m,
                    Quantity = 2,
                    PictureUrl = "aaaa"
                }
            };

            // Create an empty Buyback items list
            var basketBuybackItemList = new List<BasketBuybackItem>();

            // Create a customer basket containing the 2 items list
            var basket = new CustomerBasket()
            {
                Id = "1",
                OrderTypeId = 1,
                PhoneNumber = "0397662211",
                PromotionId = 1,
                MembershipId = 2,
                ClientSecret = null,
                PaymentIntentId = null,
                SaleItems = basketItemsList,
                BuybackItems = basketBuybackItemList
            };

            // Mock the return data of GetBasketAsync(basketId)
            string basketId = "1";
            mockBasketRepo.Setup(m => m.GetBasketAsync(basketId))
                .ReturnsAsync(basket);

            // Create new GoldType
            var goldType = new GoldType()
            {
                Id = 3,
                Name = "18K",
                LatestBidPrice = 7400000,
                LatestAskPrice = 7230000,
                Unit = "Chỉ",
                Status = true,
                Content = 75
            };

            // Create new SubCategory
            var subcategory = new SubCategory()
            {
                Id = 1,
                Name = "Nhẫn",
                Unit = "Món"
            };

            // Create new SaleCounter
            var saleCounter = new SaleCounter()
            {
                Id = 4,
                Name = "Counter 4",
                ProductQuantity = 41,
                UserId = 0,
            };

            // Create new Product which has navigation property to GoldType, SubCategory and SaleCounter
            var product = new Product()
            {
                Id = 1,
                Name = "Nhẫn Vàng 18K",
                Description = "Duis est deserunt excepteur est commodo exercitation deserunt ullamco ad voluptate labore reprehenderit in. Culpa nostrud ad sint veniam minim ut amet. Dolor incididunt fugiat enim culpa aliqua.\r\n",
                GoldWeight = 1.3400m,
                GoldTypeId = 3,
                GoldType = goldType,
                TotalWeight = 1.3400m,
                Labour = 350000,
                Status = "Available",
                Quantity = 3,
                ImageUrl = "https://tinyurl.com/w4e5cwr2",
                SubCategoryId = subcategory.Id,
                SubCategory = subcategory,
                SaleCounterId = saleCounter.Id,
                SaleCounter = saleCounter,
                Gems = new List<GemType>(),
                ProductGems = new List<ProductGem>()
            };

            // Mock the return value of GetEntityWithSpec()
            mockUnitOfWork.Setup(m => m.Repository<Product>().GetEntityWithSpec(It.IsAny<ISpecification<Product>>()))
                .ReturnsAsync(product);

            // Mock the return value of Complete() 
            // Returns 1 means successful Transaction
            mockUnitOfWork.Setup(m => m.Complete()).ReturnsAsync(1);

            // Create new OrderType
            var orderType = new OrderType()
            {
                Id = 1,
                Name = "Sales"
            };

            // Create new Customer
            var customer = new Customer()
            {
                Id = 1,
                Name = "Lâm Tiểu My",
                Phone = "0123456789"
            };

            // Create new membership
            var membership = new Membership()
            {
                Id = 2,
                Name = "Silver",
                Discount = 0.05m,
            };

            // Create new Promotion
            var promotion = new Promotion("SUMMER10", "Summer Sale", 0.15m, new DateOnly(2024,6,1))
            {
                Id = 1,
            };

            // Create new ProductItemOrdered
            var itemOrdered = new ProductItemOrdered(product.Id, product.Name, 
                product.GoldType.LatestBidPrice, product.GoldType.Name, 
                product.GoldWeight, product.Labour, product.GoldType.Unit, 
                product.TotalWeight, product.ImageUrl, product.SaleCounterId, product.SaleCounter.Name);

            // Create new OrderItem which owns ProductItemOrdered
            var orderItems = new List<OrderItem>()
            {
                new OrderItem()
                {
                    Id = 1,
                    ItemOrdered = itemOrdered,
                    Price = 10266000,
                    OrderItemGems = new List<OrderItemGem>(),
                    Quantity = 2
                }
            };

            // The expected output of the Test. Should return an order object
            var expectedOrder = new Order()
            {
                Id = 1,
                OrderDate = DateTime.UtcNow,
                Status = OrderStatus.Pending.ToString(),
                OrderTypeId = 1,
                OrderType = orderType,
                SubTotal = 20532000,
                CustomerId = 1,
                Customer = customer,
                MembershipId = 2,
                Membership = membership,
                UserId = 2,
                PaymentIntentId = null,
                PromotionId = 1,
                Promotion = promotion,
                OrderItems = orderItems
            };

            // Mock the return value of the GetEntityWithSpec
            mockUnitOfWork.Setup(m => m.Repository<Order>().GetEntityWithSpec(It.IsAny<ISpecification<Order>>()))
                .ReturnsAsync(expectedOrder);

            // Inject Mocked basket Repo and Mocked unit of work into OrderService
            var orderService = new OrderService(mockBasketRepo.Object, mockUnitOfWork.Object);

            // Act
            var order = await orderService.CreateSalesOrderAsync(basketId, customer.Id, 2);

            //Assert
            Assert.That(order, Is.EqualTo(expectedOrder));
        }

        [Test]
        public async Task CreateSalesOrder_ShouldRerturnNull_WhenOrderCreatedFailed()
        {
            // Arrange
            var mockBasketRepo = new Mock<IBasketRepository>();
            var mockUnitOfWork = new Mock<IUnitOfWork>();

            // Create new basket items list
            var basketItemsList = new List<BasketItem>()
            {
                new BasketItem()
                {
                    Id = 1,
                    ProductName = "Product 1",
                    Price = 10.0m,
                    Quantity = 2,
                    PictureUrl = "aaaa"
                }
            };

            // Create an empty Buyback items list
            var basketBuybackItemList = new List<BasketBuybackItem>();

            // Create a customer basket containing the 2 items list
            var basket = new CustomerBasket()
            {
                Id = "1",
                OrderTypeId = 1,
                PhoneNumber = "0397662211",
                PromotionId = 1,
                MembershipId = 2,
                ClientSecret = null,
                PaymentIntentId = null,
                SaleItems = basketItemsList,
                BuybackItems = basketBuybackItemList
            };

            // Mock the return data of GetBasketAsync(basketId)
            string basketId = "1";
            mockBasketRepo.Setup(m => m.GetBasketAsync(basketId))
                .ReturnsAsync(basket);

            // Create new GoldType
            var goldType = new GoldType()
            {
                Id = 3,
                Name = "18K",
                LatestBidPrice = 7400000,
                LatestAskPrice = 7230000,
                Unit = "Chỉ",
                Status = true,
                Content = 75
            };

            // Create new SubCategory
            var subcategory = new SubCategory()
            {
                Id = 1,
                Name = "Nhẫn",
                Unit = "Món"
            };

            // Create new SaleCounter
            var saleCounter = new SaleCounter()
            {
                Id = 4,
                Name = "Counter 4",
                ProductQuantity = 41,
                UserId = 0,
            };

            // Create new Product which has navigation property to GoldType, SubCategory and SaleCounter
            var product = new Product()
            {
                Id = 1,
                Name = "Nhẫn Vàng 18K",
                Description = "Duis est deserunt excepteur est commodo exercitation deserunt ullamco ad voluptate labore reprehenderit in. Culpa nostrud ad sint veniam minim ut amet. Dolor incididunt fugiat enim culpa aliqua.\r\n",
                GoldWeight = 1.3400m,
                GoldTypeId = 3,
                GoldType = goldType,
                TotalWeight = 1.3400m,
                Labour = 350000,
                Status = "Available",
                Quantity = 3,
                ImageUrl = "https://tinyurl.com/w4e5cwr2",
                SubCategoryId = subcategory.Id,
                SubCategory = subcategory,
                SaleCounterId = saleCounter.Id,
                SaleCounter = saleCounter,
                Gems = new List<GemType>(),
                ProductGems = new List<ProductGem>()
            };

            // Mock the return value of GetEntityWithSpec()
            mockUnitOfWork.Setup(m => m.Repository<Product>().GetEntityWithSpec(It.IsAny<ISpecification<Product>>()))
                .ReturnsAsync(product);

            // Mock the return value of Complete() 
            // Returns 0 means the transaction is failed and everything is rolledback
            mockUnitOfWork.Setup(m => m.Complete()).ReturnsAsync(0);

            // Mock the return value of the GetEntityWithSpec
            mockUnitOfWork.Setup(m => m.Repository<Order>().GetEntityWithSpec(It.IsAny<ISpecification<Order>>()))
                .ReturnsAsync(new Order());

            // Inject Mocked basket Repo and Mocked unit of work into OrderService
            var orderService = new OrderService(mockBasketRepo.Object, mockUnitOfWork.Object);

            // Act
            var order = await orderService.CreateSalesOrderAsync(basketId, 2, 2);

            //Assert
            Assert.IsNull(order);
        }
    }
}
