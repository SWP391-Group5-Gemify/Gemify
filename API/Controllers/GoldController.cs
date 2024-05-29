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
        private readonly IUnitOfWork _unitOfWork;
        private readonly GoldService _goldService;

        public GoldTypeController(IUnitOfWork unitOfWork, GoldService goldService)
        {
            _unitOfWork = unitOfWork;
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
            var totalPrices = await _unitOfWork.Repository<GoldPrice>().CountAsync(spec);
            var data = await _goldService.GetGoldPricesByGoldTypeId(spec);
            return Ok(new Pagination<GoldPrice>(goldPriceParams.PageIndex,goldPriceParams.PageSize,totalPrices,data));
        } 

        [HttpPut("delete")]
        [Authorize(Roles = "Admin,Manager")] 
        public async Task<ActionResult<GoldType>> DeleteGoldType([FromQuery] int id)
        {
            var spec = new GoldTypeSpecification(id);
            var exist_goldType = await _unitOfWork.Repository<GoldType>().GetEntityWithSpec(spec);
            if(exist_goldType == null) return NotFound(new ApiResponse(404));
            exist_goldType.Status = false;
            _unitOfWork.Repository<GoldType>().Update(exist_goldType);
            var result = await _unitOfWork.Repository<GoldType>().SaveAllAsync();
            if(result) return Ok("Disabled" + exist_goldType.Name);
            else return BadRequest(new ApiResponse(400));
        }    
    }
}