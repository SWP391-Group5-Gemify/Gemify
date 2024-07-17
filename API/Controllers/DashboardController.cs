using API.Dtos;
using API.Helpers;
using AutoMapper;
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
        private readonly ISaleCounterRevenueService _saleCounterRevenueService;
        private readonly IGenericRepository<SaleCounter> _saleCounterRepo;
        private readonly IMapper _mapper;

        public DashboardController(ISaleCounterRevenueService saleCounterRevenueService, 
            IGenericRepository<SaleCounter> saleCounterRepo, IMapper mapper)
        {
            _saleCounterRevenueService = saleCounterRevenueService;
            _saleCounterRepo = saleCounterRepo;
            _mapper = mapper;
        }

        // (Dashboard line chart) Get sale revenues by month based on input year
        [HttpGet("monthlyRevenues/{year}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<IReadOnlyList<TotalRevenueOfMonthDto>>> GetSaleRevenuesByYear(int year)
        {
            var revenues = await _saleCounterRevenueService.GetTotalSaleRevenuesByMonthAsync(year);
            var returnRevenues = 
                _mapper.Map<IReadOnlyList<SaleCounterRevenue>,IReadOnlyList<TotalRevenueOfMonthDto>>(revenues);
            return Ok(returnRevenues);
        }

        // (Dashboard bar chart) Get sale revenues by counter based on input month and year
        [HttpGet("revenues/counters/{month}/{year}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<IReadOnlyList<SaleCounterRevenueOfMonthDto>>>
            GetSaleCounterRevenueInMonthAsync(int month, int year)
        {
            var revenues = await _saleCounterRevenueService.GetSaleRevenuesByCounterAndMonthAsync(month, year);
            var returnRevenues = 
                _mapper.Map<IReadOnlyList<SaleCounterRevenue>,IReadOnlyList<SaleCounterRevenueOfMonthDto>>(revenues);
            foreach (var revenue in returnRevenues)
            {
                var saleCounter = await _saleCounterRepo.GetByIdAsync(revenue.SaleCounterId);
                revenue.SaleCounterName = saleCounter.Name;
            }
            return Ok(returnRevenues);
        }
    }
}
