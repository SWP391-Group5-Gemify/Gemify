using Core.Enitities;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Counters;
using Core.Specifications.Sales;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class SaleRevenueService : ISaleRevenueService
    {
        private readonly IUnitOfWork _unitOfWork; 
        private readonly ISaleCounterRevenueService _saleCounterRevenueService; 

        public SaleRevenueService(IUnitOfWork unitOfWork, ISaleCounterRevenueService saleCounterRevenueService)
        {
            _unitOfWork = unitOfWork;
            _saleCounterRevenueService = saleCounterRevenueService;
        }

        public async Task<int> CountSaleRevenuesAsync(ISpecification<SaleRevenue> spec)
        {
            return await _unitOfWork.Repository<SaleRevenue>().CountAsync(spec);
        }

        // Get revenue of sale in a day
        public async Task<IReadOnlyList<SaleRevenue>> GetSaleRevenueByDateAsync(DateOnly startDate, DateOnly toDate)
        {
            var saleRevenues = new List<SaleRevenue>();

            for (var date = startDate; date <= toDate; date = date.AddDays(1))
            {
                decimal revenue = await _saleCounterRevenueService.GetTotalSaleRevenueByDateAsync(date);
                var saleRevenue = new SaleRevenue(revenue,date);
                saleRevenues.Add(saleRevenue);
            }

            return saleRevenues.AsReadOnly();
        }

        public bool IsLeapYear(int year)
        {
            return DateTime.IsLeapYear(year);
        }

        // Get revenues of sale 
        public async Task<IReadOnlyList<SaleRevenueByMonth>> GetSaleRevenuesByMonthAsync(int year)
        {
            var saleRevenues = new List<SaleRevenueByMonth>();

            // Loop through each month of the year
            for (int month = 1; month <= 12; month++)
            {
                // Create the start and end dates for the month using DateOnly
                DateOnly fromDate = new DateOnly(year, month, 1);
                DateOnly toDate = new DateOnly(year, month, DateTime.DaysInMonth(year, month));

                // Get the revenues between the start and end dates
                var revenues = await GetSaleRevenueByDateAsync(fromDate, toDate);

                // Calculate the total revenue for the month
                decimal total = 0;
                foreach (var revenue in revenues)
                {
                    total += revenue.Revenue;
                }

                var saleRevenueByMonth = new SaleRevenueByMonth(total, month, year);

                saleRevenues.Add(saleRevenueByMonth);
            }

            return saleRevenues.AsReadOnly();
        }
    }
}
