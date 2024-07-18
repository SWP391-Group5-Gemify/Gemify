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
                    var totalDiscount = 0m;
                    if(order.PromotionId == null) {
                        totalDiscount = order.Membership.Discount;
                    }
                    else {
                        totalDiscount = order.Promotion.Discount + order.Membership.Discount;
                    }

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

        //Get list of total sale revenues by month based on input year (dashboard line chart)
        public async Task<IReadOnlyList<SaleCounterRevenue>> GetTotalSaleRevenuesByMonthAsync(int year)
        {
            var totalSaleRevenuesByMonth = new List<SaleCounterRevenue>();  

            // Calculate total sale revenues for each month from Jan to Dec
            for(int i = 1; i <= 12; i++)
            {
                var spec = new SaleCounterRevenueSpecification(i, year);
                var listSaleRevenuesWithSpec = await _unitOfWork.Repository<SaleCounterRevenue>().ListAsync(spec);
                SaleCounterRevenue totalSaleRevenuesWithSpec = 
                    new SaleCounterRevenue(listSaleRevenuesWithSpec.Sum(r => r.Revenue), new DateOnly(year, i, 1));
                totalSaleRevenuesByMonth.Add(totalSaleRevenuesWithSpec);
            }

            return totalSaleRevenuesByMonth;          
        }

        //Get list of sale revenues by counter based on input month and year (dashboard bar chart)
        public async Task<IReadOnlyList<SaleCounterRevenue>> 
            GetSaleRevenuesByCounterAndMonthAsync(int month, int year)
        {
            var saleRevenuesByCounterMonth = new List<SaleCounterRevenue>();

            var saleCounterCountSpec = new SaleCounterSpecification();
            int saleCounterCount = await _unitOfWork.Repository<SaleCounter>().CountAsync(saleCounterCountSpec);
            for(int i = 1; i <= saleCounterCount; i++)
            {
                var spec = new SaleCounterRevenueSpecification(i, month, year);
                var listSaleRevenuesWithSpec = 
                    await _unitOfWork.Repository<SaleCounterRevenue>().ListAsync(spec);
                SaleCounterRevenue saleRevenuesWithSpec =
                    new SaleCounterRevenue(listSaleRevenuesWithSpec.Sum(r => r.Revenue),i, new DateOnly(year, month, 1));
                saleRevenuesByCounterMonth.Add(saleRevenuesWithSpec);
            }

            return saleRevenuesByCounterMonth;
        }

        // Get list of years from SaleCounterRevenue table
        public async Task<IReadOnlyList<int>> GetYearsAsync()
        {
            var years = new List<int>();
            var spec = new SaleCounterRevenueSpecification();
            var revenueEntries = await _unitOfWork.Repository<SaleCounterRevenue>().ListAsync(spec);
            years.Add(revenueEntries[0].Date.Year);
            for(int i = 1; i < revenueEntries.Count; i++)
            {
                if(revenueEntries[i].Date.Year != revenueEntries[i-1].Date.Year)
                {
                    years.Add(revenueEntries[i].Date.Year);
                }
            }
            return years;
        }

    }
}