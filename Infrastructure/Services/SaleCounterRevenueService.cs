using Core.Enitities;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Counters;
using Core.Specifications.Orders;

namespace Infrastructure.Services
{
    public class SaleCounterRevenueService : ISaleCounterRevenueService
    {
        private readonly IUnitOfWork _unitOfWork;

        public SaleCounterRevenueService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        
        // Get revenues of sale counter by id
        public async Task<IReadOnlyList<SaleCounterRevenue>> 
            GetSaleCounterRevenuesByIdAsync(SaleCounterRevenueSpecification spec)
        {
            return await _unitOfWork.Repository<SaleCounterRevenue>().ListAsync(spec);
        }

        // Get revenues of sale counters by date
        public async Task<IReadOnlyList<SaleCounterRevenue>> GetSaleCounterRevenuesByDateAsync(DateOnly date)
        {
            var spec = new SaleCounterRevenueSpecification(date);
            return await _unitOfWork.Repository<SaleCounterRevenue>().ListAsync(spec);
        }
        
        // Add daily revenue entries for each counter
        public async Task<int> UpdateSaleCounterRevenuesAsync()
        {
            DateOnly today = DateOnly.FromDateTime(DateTime.Now);

            // Check for existing revenue entries of today
            var dateSpec = new SaleCounterRevenueSpecification(today);
            var existRevenuesToday = await _unitOfWork.Repository<SaleCounterRevenue>().ListAsync(dateSpec);
            if(existRevenuesToday.Any()){
                foreach (var revenue in existRevenuesToday)
                {
                    _unitOfWork.Repository<SaleCounterRevenue>().Delete(revenue);
                }
            }
            
            // HashMap of sale counter id and daily revenue
            var saleCounters = await _unitOfWork.Repository<SaleCounter>().ListAllAsync();
            Dictionary<int, decimal> saleCounterRevenueMap = new Dictionary<int, decimal>();
            foreach (var saleCounter in saleCounters)
            {
                saleCounterRevenueMap.Add(saleCounter.Id, 0);
            }

            // Get successful sales orders of current date
            var orderSpec = new OrdersSpecification(today);
            var ordersToday = await _unitOfWork.Repository<Order>().ListAsync(orderSpec);
            if(ordersToday != null)
            {
                foreach (var order in ordersToday)
                {
                    var totalDiscount = order.Promotion.Discount + order.Membership.Discount;

                    foreach (var orderItem in order.OrderItems)
                    {
                        var orderItemTotalPrice = orderItem.Price * orderItem.Quantity * (1 - totalDiscount);
                        var saleCounterId = orderItem.ItemOrdered.SaleCounterId;

                        // Add total to sale counter revenue
                        saleCounterRevenueMap[(int)saleCounterId] += orderItemTotalPrice;
                    }
                }
            }

            // Add each sale counter revenue to db
            foreach (var saleCounterRevenue in saleCounterRevenueMap)
            {
                SaleCounterRevenue newSaleCounterRevenue = 
                    new SaleCounterRevenue(saleCounterRevenue.Value, saleCounterRevenue.Key, today);
                _unitOfWork.Repository<SaleCounterRevenue>().Add(newSaleCounterRevenue);
            }
            return await _unitOfWork.Complete();
        }


        // Count revenues of a sale counter
        public async Task<int> CountSaleCounterRevenuesAsync(ISpecification<SaleCounterRevenue> spec)
        {
            return await _unitOfWork.Repository<SaleCounterRevenue>().CountAsync(spec);
        }

        public async Task<decimal> GetTotalSaleRevenueByDateAsync(DateOnly date)
        {
            var spec = new SaleCounterRevenueSpecification(date);
            var revenues = await _unitOfWork.Repository<SaleCounterRevenue>().ListAsync(spec);

            return revenues.Sum(r => r.Revenue);
        }

    }
}