using Core.Enitities;
using Core.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using API.Dtos;
using Core.Specifications;
using API.Errors;
using Microsoft.AspNetCore.Authorization;
using Core.Specifications.Counters;
using API.Helpers;

namespace API.Controllers
{
    [Authorize]
    public class SaleCountersController : BaseApiController
    {
        private readonly IGenericRepository<SaleCounter> _saleCountersRepo;
        private readonly ISaleCounterRevenueService _saleCounterRevenueService;
        private readonly IMapper _mapper;

        public SaleCountersController (IGenericRepository<SaleCounter> saleCounterRepo, 
            ISaleCounterRevenueService saleCounterRevenueService, IMapper mapper)
        {
            _saleCountersRepo = saleCounterRepo;
            _saleCounterRevenueService = saleCounterRevenueService;
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
            if (await _saleCountersRepo.SaveAllAsync()) { 
                return Ok(new ApiResponse(200, "Successfully created a new sale counter")); 
            }
            return BadRequest(new ApiResponse(400, "Fail to create a new sale counter"));
        }

        //Update sale counter
        [HttpPut("{id}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult> UpdateSaleCounter (int id, SaleCounterDto saleCounterDto)
        {
            var spec = new SaleCounterSpecification(id);
            var existingSaleCounter = await _saleCountersRepo.GetEntityWithSpec(spec);
            if (existingSaleCounter == null)
                return NotFound();

            _mapper.Map(saleCounterDto, existingSaleCounter);
            _saleCountersRepo.Update(existingSaleCounter);

            if (await _saleCountersRepo.SaveAllAsync()) 
                return Ok(new ApiResponse(200, "Successfully updated"));
            return BadRequest(new ApiResponse(400, "Fail to update sale counter!"));
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
                return Ok(new ApiResponse(200,"Successfully deleted"));
            return BadRequest(new ApiResponse(400, "Fail to delete sale counter"));
        }

        // Get revenues of sale counter by id
        [HttpGet("{saleCounterId}/revenues")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<IReadOnlyList<SaleCounterRevenue>>> 
            GetSaleCounterRevenuesById(int saleCounterId, [FromQuery] SaleCounterRevenueParams saleCounterRevenueParams)
        {
            saleCounterRevenueParams.saleCounterId = saleCounterId;
            var spec = new SaleCounterRevenueSpecification(saleCounterRevenueParams);
            var countSpec = new SaleCounterRevenueCountSpecification(saleCounterRevenueParams);
            var totalRevenues = await _saleCounterRevenueService.CountSaleCounterRevenuesAsync(countSpec);
            var data = await _saleCounterRevenueService.GetSaleCounterRevenuesByIdAsync(spec);
            return Ok(new Pagination<SaleCounterRevenue>
                (saleCounterRevenueParams.PageIndex,saleCounterRevenueParams.PageSize,totalRevenues,data));
        }

        // Get revenues of sale counters by date
        [HttpGet("bydate")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<IReadOnlyList<SaleCounterRevenue>>> GetSaleCounterRevenuesByDate([FromQuery] DateOnly revenueDate)
        {
            var revenues = await _saleCounterRevenueService.GetSaleCounterRevenuesByDateAsync(revenueDate);
            return Ok(revenues);
        }

        // Update daily sale counter revenues
        [HttpPost("updates")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult> UpdateSaleCounterRevenues()
        {
            var result = await _saleCounterRevenueService.UpdateSaleCounterRevenuesAsync();
            if(result > 0) return Ok(new ApiResponse(200,"Daily revenues updated!"));
            else return BadRequest(new ApiResponse(400,"Failed to update daily revenues!"));
        }
    }
}
