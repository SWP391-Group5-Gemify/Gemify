using Core.Enitities;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Counters;
using Core.Specifications.Sales;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class SaleRevenueService : ISaleRevenueService
    {
        private readonly IUnitOfWork _unitOfWork; 
        private readonly StoreContext _context; 

        public SaleRevenueService(IUnitOfWork unitOfWork, StoreContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }

        // Get revenue of sale in a day
        public async Task<IReadOnlyList<SaleRevenue>> GetSaleRevenueByDateAsync(DateOnly startDate, DateOnly toDate)
        {
            var saleRevenues = new List<SaleRevenue>();

            for (var date = startDate; date <= toDate; date = date.AddDays(1))
            {
                decimal revenue = await GetTotalSaleRevenueByDateAsync(date);
                var saleRevenue = new SaleRevenue
                {
                    Revenue = revenue,
                    Date = date,
                };
                saleRevenues.Add(saleRevenue);
            }

            return saleRevenues.AsReadOnly();
        }

        public async Task<decimal> GetTotalSaleRevenueByDateAsync(DateOnly date)
        {
            var spec = new SaleCounterRevenueSpecification(date);
            var revenues = await _unitOfWork.Repository<SaleCounterRevenue>().ListAsync(spec);

            return revenues.Sum(r => r.Revenue);
        }

        /**
         * Get list of monthly revenue of year
         */
        public async Task<IReadOnlyList<SaleRevenue>> GetSaleRevenuesByMonthAsync(int year)
        {
            var spec = new SaleCounterRevenueSpecification(year);
            var counterDailyRevenuesOfYear = await _unitOfWork.Repository<SaleCounterRevenue>().ListAsync(spec);
            var monthlyRevenueList = Enumerable.Range(1, 12)
                                               .GroupJoin(
                                                    counterDailyRevenuesOfYear,
                                                    month => month,
                                                    revenue => revenue.Date.Month,
                                                    (month, revenues) => new SaleRevenue
                                                    {
                                                        Month = month,
                                                        Revenue = revenues.Sum(r => r.Revenue)
                                                    })
                                               .ToList();

            return monthlyRevenueList;
        }

        /**
         * Get total yearly revenue
         */
        public async Task<decimal> GetSaleRevenueByYearAsync(int year)
        {
            var spec = new SaleCounterRevenueSpecification(year);
            var counterDailyRevenuesOfYear = await _unitOfWork.Repository<SaleCounterRevenue>().ListAsync(spec);
            return counterDailyRevenuesOfYear.Sum(r => r.Revenue);
        }

        /**
         * Get list of sale counter's monthly revenue of year 
         */
        public async Task<IReadOnlyList<DashboardCounterRevenue>> 
            GetSaleCounterRevenuesByMonthAsync(int year)
        {
            var saleRevenues = new List<DashboardCounterRevenue>();

            // Loop through each month of the year
            for (int month = 1; month <= 12; month++)
            {
                var dashboardCounterRevenue = new DashboardCounterRevenue();
                var saleCounterRevenueByMonths = GetSaleCounterRevenueInMonthAsync(month,year);
                dashboardCounterRevenue.saleCounterRevenueByMonths = await saleCounterRevenueByMonths;
                dashboardCounterRevenue.month = month;

                saleRevenues.Add(dashboardCounterRevenue);
            }

            return saleRevenues;
        }

        public async Task<IReadOnlyList<SaleCounterRevenueByMonth>>
            GetSaleCounterRevenueInMonthAsync(int month, int year)
        {
            var counters = await _context.SaleCounters
                                .Include(c => c.SaleCounterRevenue)
                                .ToListAsync();

            var saleCounterRevenues = new List<SaleCounterRevenueByMonth>();

            foreach (var counter in counters)
            {
                var total = 0;
                var saleCounterRevenueByMonth = new SaleCounterRevenueByMonth()
                {
                    SaleCounterId = counter.Id
                }; 
                saleCounterRevenueByMonth.SaleCounterId = counter.Id;

                foreach (var counterRevenue in counter.SaleCounterRevenue)
                {
                    if (counterRevenue == null)
                    {
                        total = 0;
                    }
                    else if (counterRevenue.Date.Month == month && counterRevenue.Date.Year == year)
                    {
                        total += (int)counterRevenue.Revenue;
                    }
                }
                saleCounterRevenueByMonth.Revenue = total;

                saleCounterRevenueByMonth.SaleCounterName = counter.Name;

                saleCounterRevenues.Add(saleCounterRevenueByMonth);
            }

            return saleCounterRevenues;
        }
    }
}
