using Core.Enitities;
using Core.Interfaces;
using Core.Specifications.Promotions;
using API.Errors;
using API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PromotionsController : BaseApiController
    {
        private readonly IGenericRepository<Promotion> _promotionRepo;
        public PromotionsController(IGenericRepository<Promotion> promotionRepo)
        {
            _promotionRepo = promotionRepo;
        }

        // Get promotions with spec
        [HttpGet("discounts")]
        [Authorize(Roles = "StoreOwner,StoreManager,Seller,Cashier")]
        public async Task<ActionResult<Pagination<IReadOnlyList<Promotion>>>> GetPromotions([FromQuery] PromotionParams promotionParams)
        {
            var spec = new PromotionSpecification(promotionParams);
            var countSpec = new PromotionCountSpecification(promotionParams);
            var totalPromotions = await _promotionRepo.CountAsync(countSpec);
            var promotions = await _promotionRepo.ListAsync(spec);

            // Update status for expired promotions
            if (promotions != null)
            {
                DateOnly today = DateOnly.FromDateTime(DateTime.UtcNow);
                int countExpiredPromotions = 0;
                foreach (var promotion in promotions)
                {
                    if (promotion.Status == true && today.CompareTo(promotion.ExpDate) > 0)
                    {
                        promotion.Status = false;
                        _promotionRepo.Update(promotion);
                        countExpiredPromotions++;
                    }
                }
                if (countExpiredPromotions > 0) await _promotionRepo.SaveAllAsync();
                return Ok(new Pagination<Promotion>
                    (promotionParams.PageIndex, promotionParams.PageSize, totalPromotions, promotions));
            }
            else return BadRequest(new ApiResponse(400, "Cannot retrieve promotions list!"));
        }

        // Get indate promotion by code
        [HttpGet]
        [Authorize(Roles = "StoreOwner,StoreManager,Cashier,Seller")]
        public async Task<ActionResult<Promotion>> GetPromotionByCode(string code)
        {
            var spec = new PromotionSpecification(code);
            var exist_promotion = await _promotionRepo.GetEntityWithSpec(spec);
            if(exist_promotion == null) return NotFound(new ApiResponse(404, "Promotion not found!"));
            return Ok(exist_promotion);
        }

        // Add new promotion
        [HttpPost]
        [Authorize(Roles = "StoreOwner")]
        public async Task<ActionResult> AddPromotion(Promotion promotion)
        {
            if (promotion != null && promotion.ExpDate.CompareTo(promotion.EffDate) > 0)
            {
                    _promotionRepo.Add(promotion);
                    var result = await _promotionRepo.SaveAllAsync();
                    if (result) return Ok(new ApiResponse(200, "New promotion added successfully!"));
                    else return BadRequest(new ApiResponse(400, "Failed to add new promotion!"));
            }
            else return BadRequest(new ApiResponse(400, "Failed to add new promotion!"));
        }

        // Disable promotion manually
        [HttpDelete]
        [Authorize(Roles = "StoreOwner")]
        public async Task<ActionResult> DisablePromotionByCode(string code)
        {
            var spec = new PromotionSpecification(code);
            var exist_promotion = await _promotionRepo.GetEntityWithSpec(spec);
            if(exist_promotion == null) return BadRequest(new ApiResponse(400, "Failed to disable promotion!"));
            exist_promotion.Status = false;
            _promotionRepo.Update(exist_promotion);
            var result = await _promotionRepo.SaveAllAsync();
            if(result) return Ok(new ApiResponse(200,"Disabled promotion successfully!"));
            else return BadRequest(new ApiResponse(400,"Failed to disable promotion!"));
        }
    }
}
