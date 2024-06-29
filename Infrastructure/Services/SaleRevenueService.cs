using Core.Enitities;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Counters;
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

        /**
         * Get list of monthly revenue of year
         */
        public async Task<IReadOnlyList<SaleRevenue>> GetMonthlyRevenuesAsync(int year)
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
        public async Task<decimal> GetYearlyRevenueAsync(int year)
        {
            var spec = new SaleCounterRevenueSpecification(year);
            var counterDailyRevenuesOfYear = await _unitOfWork.Repository<SaleCounterRevenue>().ListAsync(spec);
            return counterDailyRevenuesOfYear.Sum(r => r.Revenue);
        }

        /**
         * Get list of sale counter's monthly revenue of year 
         */
        public async Task<IReadOnlyList<DashboardCounterRevenue>>
            GetSaleCounterMonthlyRevenuesAsync(int year)
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

        //lấy theo tháng cụ thể
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

        /**
         * Get list of sale counter revenues of year
         */
        public async Task<IReadOnlyList<SaleCounterRevenue>> GetSaleCounterYearlyRevenueAsync(int year)
        {
            var yearlyRevenues = new List<SaleCounterRevenue>();

            // Giả sử có 6 quầy hàng
            for (int saleCounterId = 1; saleCounterId <= 6; saleCounterId++)
            {
                decimal totalRevenue = 0;
                for (int month = 1; month <= 12; month++)
                {
                    var monthlyRevenues = await GetSaleCounterRevenueInMonthAsync(month, year);

                    foreach (var revenue in monthlyRevenues)
                    {
                        if (revenue.SaleCounterId == saleCounterId)
                        {
                            totalRevenue += revenue.Revenue;
                        }
                    }
                }

                var yearlyRevenue = new SaleCounterRevenue(totalRevenue, saleCounterId, new DateOnly(year, 1, 1));
                yearlyRevenues.Add(yearlyRevenue);
            }

            return yearlyRevenues.AsReadOnly();
        }

        //lấy revenue của counter theo năm
        public async Task<IReadOnlyList<SaleCounterRevenueYearly>>
            GetSaleCounterRevenueYearlyAsync(int year)
        {
            var counters = await _context.SaleCounters
                                .Include(c => c.SaleCounterRevenue)
                                .ToListAsync();

            var saleCounterRevenues = new List<SaleCounterRevenueYearly>();

            foreach (var counter in counters)
            {
                var total = 0;
                var saleCounterRevenueYearly = new SaleCounterRevenueYearly()
                {
                    SaleCounterId = counter.Id
                };
                saleCounterRevenueYearly.SaleCounterId = counter.Id;

                foreach (var counterRevenue in counter.SaleCounterRevenue)
                {
                    if (counterRevenue == null)
                    {
                        total = 0;
                    }
                    else if (counterRevenue.Date.Year == year)
                    {
                        total += (int)counterRevenue.Revenue;
                    }
                }
                saleCounterRevenueYearly.Revenue = total;

                saleCounterRevenueYearly.SaleCounterName = counter.Name;

                saleCounterRevenues.Add(saleCounterRevenueYearly);
            }

            return saleCounterRevenues;
        }
    }
}
