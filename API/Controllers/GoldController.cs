using API.Errors;
using API.Helpers;
using Core.Enitities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GoldTypeController : BaseApiController 
    {
        private readonly GoldService _goldService;

        public GoldTypeController(GoldService goldService)
        {
            _goldService = goldService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<ActionResult<IReadOnlyList<GoldType>>> GetGoldTypes()
        {
            var goldTypes = await _goldService.GetAllGoldTypes();
            if(goldTypes == null) return NotFound(new ApiResponse(404));
            else return Ok(goldTypes);
        }  

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<ActionResult<IReadOnlyList<GoldPrice>>> GoldPriceHistoryById(int id)
        {
            var goldPriceParams = new GoldPriceParams(){ goldTypeId = id };
            var spec = new GoldPriceSpecification(goldPriceParams);
            var totalPrices = await _goldService.CountGoldPricesAsync(id);
            var data = await _goldService.GetGoldPricesByGoldTypeId(spec);
            return Ok(new Pagination<GoldPrice>(goldPriceParams.PageIndex,goldPriceParams.PageSize,totalPrices,data));
        } 

        [HttpPut("delete")]
        [Authorize(Roles = "Admin,Manager")] 
        public async Task<ActionResult<GoldType>> DeleteGoldType([FromQuery] int id)
        {
            var result = await _goldService.DeleteGoldTypeAsync(id);
            if(result) return Ok("Disabled succeeded.");
            else return BadRequest(new ApiResponse(400));
            
        }    
    }
}