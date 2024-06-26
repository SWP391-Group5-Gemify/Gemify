using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Enitities;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Gems;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class GemsController : BaseApiController
    {
        private readonly IGemService _gemService;
        private readonly IMapper _mapper;

        public GemsController(IGemService gemService, IMapper mapper)
        {
            _gemService = gemService;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "StoreOwner,StoreManager,Seller,Repurchaser,Cashier")]
        public async Task<ActionResult<IReadOnlyList<GemTypeDto>>> GetGems([FromQuery] GemSpecParams gemSpecParams)
        {
            var spec = new GemSpecification(gemSpecParams);

            var countSpec = new GemWithFilterForCountSpecification(gemSpecParams);

            var gems = await _gemService.GetGemsAsync(spec);

            var totalGems = await _gemService.CountGemAsync(countSpec);

            var data = _mapper.Map<IReadOnlyList<GemType>, IReadOnlyList<GemTypeDto>>(gems);

            return Ok(new Pagination<GemTypeDto>(gemSpecParams.PageIndex, gemSpecParams.PageSize, totalGems, data));

        }

        [HttpGet("{id}")]
        [Authorize(Roles = "StoreOwner,StoreManager,Seller,Repurchaser,Cashier")]
        public async Task<ActionResult<GemType>> GetGemById(int id)
        {
            var spec = new GemSpecification(id);

            var gem = await _gemService.GetGemAsync(spec);

            if (gem == null) return NotFound(new ApiResponse(404, "The type of gem you are looking for is not found"));

            return Ok(_mapper.Map<GemType, GemTypeDto>(gem));
        }

        [HttpGet("prices/{gemId}")]
        [Authorize(Roles = "StoreOwner,StoreManager,Seller,Repurchaser,Cashier")]
        public async Task<ActionResult<IReadOnlyList<GemPriceDto>>> GetGemPriceHistory(int gemId, [FromQuery] GemPriceSpecParams gemPriceSpecParams)
        {
            gemPriceSpecParams.GemId = gemId;

            var spec = new GemPriceSpecification(gemPriceSpecParams);

            var gemPrices = await _gemService.GetGemPrices(spec);

            var countSpec = new GemPriceWithFilterForCountSpecification(gemPriceSpecParams);
            
            var totalGemPrices = await _gemService.CountGemPricesAsync(countSpec);

            var data = _mapper.Map<IReadOnlyList<GemPrice>, IReadOnlyList<GemPriceDto>>(gemPrices);

            return Ok(new Pagination<GemPriceDto>(gemPriceSpecParams.PageIndex, gemPriceSpecParams.PageSize, totalGemPrices, data));
        }

        [HttpPost]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult> AddGem(GemTypeDto gemTypeDto) 
        {
            var gem = _mapper.Map<GemTypeDto, GemType>(gemTypeDto);

            if (!(await _gemService.AddGem(gem))) return BadRequest(new ApiResponse(400, "Failed to add new Gem"));

            return Ok(new ApiResponse(200, "Add Gem Successfully"));
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult> DeleteGem(int id)
        {
            if (!(await _gemService.DeleteGem(id))) return BadRequest(new ApiResponse(400, "Failed to delete Gem"));

            return Ok(new ApiResponse(200, "Delete Gem Successfully"));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult> UpdateGemPrice(int id, GemPrice gemPrice)
        {
            if (!(await _gemService.UpdateGemPrice(id, gemPrice))) return BadRequest(new ApiResponse(400, "Failed to update Gem Price"));

            return Ok(new ApiResponse(200, "Update Gem Price Successfully"));
        }

    }
}
