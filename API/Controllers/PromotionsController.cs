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
        private readonly IPromotionService _promotionService;
        public PromotionsController(IPromotionService promotionService)
        {
            _promotionService = promotionService;
        }

        // Get promotions with spec
        [HttpGet]
        [Authorize(Roles = "StoreOwner,StoreManager,Seller,Cashier")]
        public async Task<ActionResult<Pagination<IReadOnlyList<Promotion>>>> GetPromotions([FromQuery] PromotionParams promotionParams)
        {
            var spec = new PromotionSpecification(promotionParams);
            var countSpec = new PromotionCountSpecification(promotionParams);
            var totalPromotions = await _promotionService.CountPromotionsWithSpecAsync(countSpec);
            var promotions = await _promotionService.GetPromotionsWithSpecAsync(spec);
            return Ok(new Pagination<Promotion>
                (promotionParams.PageIndex, promotionParams.PageSize, totalPromotions, promotions));
        }

        // Get indate promotion by code
        // For cashier/seller to enter into basket or order
        [HttpGet("{code}")]
        [Authorize(Roles = "StoreOwner,StoreManager,Cashier,Seller")]
        public async Task<ActionResult<Promotion>> GetPromotionByCode(string code)
        {
            var exist_promotion = await _promotionService.GetPromotionByCodeAsync(code);
            if(exist_promotion == null) 
                return NotFound(new ApiResponse(404, "Ưu đãi đã hết hạn hoặc không tồn tại trong hệ thống!"));
            return Ok(exist_promotion);
        }

        // Get promotion by id
        [HttpGet("discounts/{id}")]
        [Authorize(Roles = "StoreOwner,StoreManager,Cashier,Seller")]
        public async Task<ActionResult<Promotion>> GetPromotionById(int id)
        {
            var exist_promotion = await _promotionService.GetPromotionByIdAsync(id);
            if(exist_promotion == null) 
                return NotFound(new ApiResponse(404, "Ưu đãi không tồn tại trong hệ thống!"));
            return Ok(exist_promotion);
        }

        // Add new promotion
        [HttpPost]
        [Authorize(Roles = "StoreOwner")]
        public async Task<ActionResult<Promotion>> AddPromotion(Promotion promotion)
        {
            var newPromotion = await _promotionService.AddNewPromotionAsync(promotion);
            if(newPromotion == null) return BadRequest(new ApiResponse(400, "Thêm ưu đãi vào hệ thống thất bại!"));
            return newPromotion;
        }

        // Disable promotion manually
        [HttpDelete("{id}")]
        [Authorize(Roles = "StoreOwner")]
        public async Task<ActionResult> DisablePromotionById(int id)
        {
            var exist_promotion = await _promotionService.GetPromotionByIdAsync(id);
            if(exist_promotion != null)
            {
                await _promotionService.UpdateExpiredPromotionAsync(exist_promotion);
                return Ok(new ApiResponse(200, "Tắt hiệu lực của ưu đãi thành công!"));
            }
            else return BadRequest(new ApiResponse(400, "Tắt hiệu lực của ưu đãi thất bại!"));
        }
    }
}
