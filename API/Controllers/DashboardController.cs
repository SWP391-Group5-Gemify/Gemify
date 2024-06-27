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
        private readonly ISaleRevenueService _saleRevenueService;

        public DashboardController(ISaleRevenueService saleRevenueService)
        {
            _saleRevenueService = saleRevenueService;
        }

        // Get revenues of sale by date, from date to date
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
            decimal total = await _saleRevenueService.GetSaleCounterRevenueByYearAsync(year);
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
