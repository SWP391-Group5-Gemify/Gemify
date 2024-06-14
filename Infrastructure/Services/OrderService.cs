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
        public Task<Order> CreateSalesOrderAsync()
        {
            throw new NotImplementedException();

        }




        /**
         * =================================
         *         CREATE BUYBACK ORDER
         * =================================
        **/
        public async Task<int?> CreateBuyBackOrderAsync(string basketId, int customerId, int repurchaserId)
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
                    var purchaseGoldPrice = product.CalculatePurchaseGoldPrice();
                    orderItem.ItemOrdered.GoldPrice = (decimal) purchaseGoldPrice;

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
            var orderDate = DateTime.Now;

            var order = new Order(orderDate, basket.OrderTypeId, totalPrice, customerId, repurchaserId, null, orderItemList);
            _unitOfWork.Repository<Order>().Add(order);

            // save to db
            var result = await _unitOfWork.Complete();
            if (result <= 0) return null;
            return order.Id;
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
