using Core.Enitities;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Counters;
using Core.Specifications.Sales;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
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
                var saleRevenue = new SaleRevenue(revenue,date);
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

        public async Task<decimal> GetSaleRevenueByYearAsync(int year)
        {
            decimal total = 0;
            DateOnly fromDate;
            DateOnly toDate;

            if (IsLeapYear(year))
            {
                fromDate = new DateOnly(year, 1, 1);
                toDate = new DateOnly(year, 12, 31);
            }
            else
            {
                fromDate = new DateOnly(year, 1, 1);
                toDate = new DateOnly(year, 12, 30);
            }

            // Get the revenues between the start and end dates
            var revenues = await GetSaleRevenueByDateAsync(fromDate, toDate);

            foreach (var revenue in revenues)
            {
                total += revenue.Revenue;
            }

            return total;
        }

        // Get revenues of sale counter by id
        public async Task<IReadOnlyList<SaleCounterRevenue>>
            GetSaleCounterRevenuesByIdAsync(SaleCounterRevenueSpecification spec)
        {
            return await _unitOfWork.Repository<SaleCounterRevenue>().ListAsync(spec);
        }

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

        public decimal CalculateTotal(List<decimal> number)
        {
            decimal total = number.Sum();

            return total;
        }
    }
}
