using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Enitities;
using Core.Specifications;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GoldsController : BaseApiController 
    {
        private readonly IGoldService _goldService;
        private readonly IMapper _mapper;

        public GoldsController(IGoldService goldService, IMapper mapper)
        {
            _goldService = goldService;
            _mapper = mapper;
        }

        // Get gold type list with specification
        [HttpGet]
        [Authorize(Roles = "StoreOwner,StoreManager,Seller,Repurchaser,Cashier")]
        public async Task<ActionResult<IReadOnlyList<GoldType>>> GetGoldTypes([FromQuery] GoldTypeParams goldTypeParams)
        {  
            var spec = new GoldTypeSpecification(goldTypeParams);
            var countSpec = new GoldTypeWithFilterForCountSpecification(goldTypeParams);
            var totalGoldTypes = await _goldService.CountGoldTypesAsync(countSpec);
            var goldTypes = await _goldService.GetGoldTypesAsync(spec);
            if(goldTypes == null) return NotFound(new ApiResponse(404));
            return Ok(new Pagination<GoldType>
                    (goldTypeParams.PageIndex,goldTypeParams.PageSize,totalGoldTypes,goldTypes));
        }

        // Get gold type by id
        [HttpGet("{id}")]
        [Authorize(Roles ="StoreOwner,StoreManager,Seller,Repurchaser,Cashier")]
        public async Task<ActionResult<GoldType>> GetGoldTypeById(int id)
        {
            var exist_goldType = await _goldService.GetGoldTypeByIdAsync(id);
            if(exist_goldType == null) return NotFound(new ApiResponse(404,"Gold type not found."));
            return Ok(exist_goldType);
        }   

        // Get gold price history by gold type id
        [HttpGet("prices")]
        [Authorize(Roles = "StoreOwner,StoreManager,Seller,Repurchaser,Cashier")]
        public async Task<ActionResult<IReadOnlyList<GoldPrice>>> GoldPriceHistoryById([FromQuery] GoldPriceParams goldPriceParams)
        {
            var spec = new GoldPriceSpecification(goldPriceParams);
            var countSpec = new GoldPriceWithFilterForCountSpecification(goldPriceParams);
            var totalPrices = await _goldService.CountGoldPricesAsync(countSpec);
            var goldPrices = await _goldService.GetGoldPricesByIdAsync(spec);
            var data = _mapper.Map<IReadOnlyList<GoldPrice>, IReadOnlyList<GoldPriceDto>>(goldPrices);
            return Ok(new Pagination<GoldPriceDto>
                    (goldPriceParams.PageIndex,goldPriceParams.PageSize,totalPrices,data));
        }

        // Add new gold type
        [HttpPost]
        [Authorize(Roles = "StoreOwner,StoreManager")] 
        public async Task<ActionResult> AddGoldType(GoldType goldType)
        {
            var result = await _goldService.AddGoldTypeAsync(goldType);
            if(result) return Ok("Add gold type successful.");
            else return BadRequest(new ApiResponse(400, "Failed to add new gold type."));
        }

        // Disable gold type status
        [HttpDelete]
        [Authorize(Roles = "StoreOwner,StoreManager")] 
        public async Task<ActionResult> DeleteGoldType([FromQuery] int id)
        {
            var result = await _goldService.DeleteGoldTypeAsync(id);
            if(result) return Ok("Disable successful.");
            else return BadRequest(new ApiResponse(400,"Failed to disable gold type."));
        }

        // Update gold prices and add to gold price history
        [HttpPut]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult> UpdateGoldPrice(GoldPrice goldPrice)
        {
            var result = await _goldService.UpdateGoldPriceAsync(goldPrice);
            if(result) return Ok("Update gold prices successful.");
            else return BadRequest(new ApiResponse(400,"Failed to update gold prices."));
        }
           
    }
}