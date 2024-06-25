using API.Helpers;
using Core.Enitities;
using Core.Interfaces;
using Core.Specifications.Counters;
using Core.Specifications.Sales;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace API.Controllers
{
    public class DashboardController : BaseApiController
    {
        private readonly IGenericRepository<SaleCounter> _saleCountersRepo;
        private readonly ISaleCounterRevenueService _saleCounterRevenueService;
        private readonly ISaleRevenueService _saleRevenueService;

        public DashboardController(IGenericRepository<SaleCounter> saleCounterRepo,
            ISaleCounterRevenueService saleCounterRevenueService, ISaleRevenueService saleRevenueService)
        {
            _saleCountersRepo = saleCounterRepo;
            _saleCounterRevenueService = saleCounterRevenueService;
            _saleRevenueService = saleRevenueService;
        }

        // Get revenues of sale counter by id
        [HttpGet("revenues")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<IReadOnlyList<SaleCounterRevenue>>>
            GetSaleCounterRevenuesById([FromQuery] SaleCounterRevenueParams saleCounterRevenueParams)
        {
            var spec = new SaleCounterRevenueSpecification(saleCounterRevenueParams);
            var countSpec = new SaleCounterRevenueCountSpecification(saleCounterRevenueParams);
            var totalRevenues = await _saleCounterRevenueService.CountSaleCounterRevenuesAsync(countSpec);
            var data = await _saleCounterRevenueService.GetSaleCounterRevenuesByIdAsync(spec);
            return Ok(new Pagination<SaleCounterRevenue>
                (saleCounterRevenueParams.PageIndex, saleCounterRevenueParams.PageSize, totalRevenues, data));
        }

        // Get revenues of sale by date
        [HttpGet("totalRevenues")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<IReadOnlyList<SaleRevenue>>> 
            GetSaleCounterRevenuesByDate([FromQuery] DateOnly fromDate, [FromQuery] DateOnly toDate)
        {
            var revenues = await _saleRevenueService.GetSaleRevenueByDateAsync(fromDate,toDate);
            return Ok(revenues);
        }

        // Get revenues of sale 
        [HttpGet("revenue/{year}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<decimal>> GetSaleCounterRevenueByYear(int year)
        {
            decimal total = 0;
            DateOnly fromDate;
            DateOnly toDate;

            if (_saleRevenueService.IsLeapYear(year))
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
            var revenues = await _saleRevenueService.GetSaleRevenueByDateAsync(fromDate, toDate);

            foreach (var revenue in revenues)
            {
                total += revenue.Revenue;
            }
            return Ok(total);
        }

        // Get revenues of sale by month in year
        [HttpGet("revenues/{year}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<IReadOnlyList<SaleRevenueByMonth>>> GetSaleCounterRevenuesByYear(int year)
        {
            var revenues = await _saleRevenueService.GetSaleRevenuesByMonthAsync(year);
            return Ok(revenues);
        }
    }
}
