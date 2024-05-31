using Core.Enitities;
using Core.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using API.Dtos;
using Core.Specifications;
using API.Errors;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class SaleCountersController : BaseApiController
    {
        private readonly IGenericRepository<SaleCounter> _saleCountersRepo;
        private readonly IMapper _mapper;

        public SaleCountersController (IGenericRepository<SaleCounter> saleCounterRepo, IMapper mapper)
        {
            _saleCountersRepo = saleCounterRepo;
            _mapper = mapper;
        }

        //Get all sale counters with spec
        [HttpGet]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<IReadOnlyList<SaleCounterDto>>> GetSaleCounters([FromQuery] SaleCounterParams saleCounterParams)
        {
            var spec = new SaleCounterSpecification(saleCounterParams);
            var saleCounters = await _saleCountersRepo.ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<SaleCounter>, IReadOnlyList<SaleCounterDto>>(saleCounters);
            return Ok(data);
        }

        // Get sale counter by id
        [HttpGet("{id}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<SaleCounterDto>> GetSaleCounter (int id)
        {
            var spec = new SaleCounterSpecification(id);
            var saleCounter = await _saleCountersRepo.GetEntityWithSpec(spec);
            if (saleCounter == null) { return NotFound(new ApiResponse(404)); }
            return _mapper.Map<SaleCounter, SaleCounterDto>(saleCounter);
        }

        //Create sale counter
        [HttpPost]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult> AddSaleCounter (SaleCounterDto saleCounterDto)
        {
            var saleCounter = _mapper.Map<SaleCounterDto, SaleCounter>(saleCounterDto);
            saleCounter.Status = true;
            _saleCountersRepo.Add(saleCounter);
            if (await _saleCountersRepo.SaveAllAsync()) { return Ok("Successfully created a new sale counter"); }
            return BadRequest("Fail to create a new sale counter");
        }

        //Update sale counter
        [HttpPut]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult> UpdateSaleCounter (SaleCounterDto saleCounterDto)
        {
            var spec = new SaleCounterSpecification(saleCounterDto.Id);
            var existingSaleCounter = await _saleCountersRepo.GetEntityWithSpec(spec);
            if (existingSaleCounter == null)
                return NotFound();

            _mapper.Map(saleCounterDto, existingSaleCounter);
            _saleCountersRepo.Update(existingSaleCounter);

            if (await _saleCountersRepo.SaveAllAsync()) 
                return Ok("Successfully updated!");
            return BadRequest("Fail to update sale counter!");
        }

        //Delete counter
        [HttpDelete("{id}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult> DeleteSaleCounter (int id)
        {
            var spec = new SaleCounterSpecification(id);
            var existingSaleCounter = await _saleCountersRepo.GetEntityWithSpec(spec);
            if (existingSaleCounter == null)
                return NotFound();

            existingSaleCounter.Status = false;
            _saleCountersRepo.Update(existingSaleCounter);

            if (await _saleCountersRepo.SaveAllAsync())
                return Ok("Successfully deleted!");
            return BadRequest("Fail to delete sale counter!");
        }

    }
}
