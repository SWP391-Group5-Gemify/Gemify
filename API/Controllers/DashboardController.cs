using API.Helpers;
using Core.Enitities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace API.Controllers
{
    public class DashboardController : BaseApiController
    {
        private readonly ISaleRevenueService _saleRevenueService;

        public DashboardController(ISaleRevenueService saleRevenueService)
        {
            _saleRevenueService = saleRevenueService;
        }

        // Get revenues of sale 
        [HttpGet("revenue/{year}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<decimal>> GetSaleRevenueByYear(int year)
        {
            decimal total = await _saleRevenueService.GetYearlyRevenueAsync(year);
            return Ok(total);
        }

        // Get revenues of sale by month in year
        [HttpGet("monthlyRevenues/{year}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<IReadOnlyList<SaleRevenue>>> GetSaleRevenuesByYear(int year)
        {
            var revenues = await _saleRevenueService.GetMonthlyRevenuesAsync(year);
            return Ok(revenues);
        }

        // Get counters revenues of sale by month in year
        [HttpGet("revenues/counters/{year}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<IReadOnlyList<DashboardCounterRevenue>>>
            GetSaleCounterRevenuesByMonthAsync(int year)
        {
            var revenues = await _saleRevenueService.GetSaleCounterMonthlyRevenuesAsync(year);
            return Ok(revenues);
        }

        // Get counters revenues of sale in year
        [HttpGet("revenues/counterYearlyRevenues/{year}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<IReadOnlyList<SaleCounterRevenue>>>
            GetSaleCounterYearlyRevenuesAsync(int year)
        {
            var revenues = await _saleRevenueService.GetSaleCounterRevenueYearlyAsync(year);
            return Ok(revenues);
        }

        // Get counters revenue in month
        [HttpGet("revenues/counters/{month}/{year}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<IReadOnlyList<SaleCounterRevenueByMonth>>>
            GetSaleCounterRevenueInMonthAsync(int month, int year)
        {
            var revenues = await _saleRevenueService.GetSaleCounterRevenueInMonthAsync(month,year);
            return Ok(revenues);
        }
    }
}
