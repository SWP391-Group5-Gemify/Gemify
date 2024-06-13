using Core.Enitities;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications.Orders;
using Infrastructure.Data;
using Microsoft.IdentityModel.Tokens;

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
                    var product = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);

                    // get purchase gold price
                    var goldType = await _unitOfWork.Repository<GoldType>().GetByIdAsync((int)product.GoldTypeId);
                    var purchaseGoldPrice = (decimal)(goldType.LatestAskPrice * product.GoldWeight);

                    var itemOrdered = new ProductItemOrdered(product.Id, product.Name, purchaseGoldPrice, product.GoldType.Name, product.GoldWeight
                        , 0, null, product.TotalWeight, product.ImageUrl);

                    // create order item
                    var orderItem = new OrderItem(itemOrdered, 0, 1);
                    orderItem.Price = itemOrdered.GoldPrice;

                    // check whether product has gem or not
                    var gemList = product.ProductGems;
                    if (!gemList.IsNullOrEmpty())
                    {
                        var orderItemGemList = new List<OrderItemGem>();
                        foreach (var gem in gemList)
                        {
                            var gemPrice = gem.GemType.LatestPrice * (decimal) 0.7;
                            var gemItemOrdered = new ProductGemsItemOrdered(gem.GemType.Name, gem.GemType.Color, gem.GemWeight,gemPrice,
                                gem.GemType.Carat, gem.GemType.Clarity, gem.CertificateCode);

                            var orderItemGem = new OrderItemGem(gemItemOrdered);
                            orderItemGem.Quantity = gem.Quantity;
                            orderItemGem.Price = gemPrice * gem.Quantity;
                            // add gem price to order item
                            orderItem.Price += orderItemGem.Price;

                            orderItemGemList.Add(orderItemGem);

                        }
                        orderItem.OrderItemGems = orderItemGemList;
                        
                    }
                    totalPrice += orderItem.Price;
                    orderItemList.Add(orderItem);
                }
            }

            // create order
            var orderDate = DateTime.Now;

            var order = new Order(orderDate, basket.OrderTypeId, totalPrice, customerId, repurchaserId, null, orderItemList);
            _unitOfWork.Repository<Order>().Add(order);

            // save to db
            var result = await _unitOfWork.Complete();
            if (result <= 0) return null;
            return order;
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
