using Core.Interfaces;
using Core.Enitities;
using Core.Specifications.Promotions;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class PromotionService : IPromotionService
    {
        private readonly IUnitOfWork _unitOfWork;

        public PromotionService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // Get promotions with spec
        // Update expired promotions before return
        public async Task<IReadOnlyList<Promotion>> GetPromotionsWithSpecAsync(PromotionSpecification promotionSpec)
        {
            var promotions = await _unitOfWork.Repository<Promotion>().ListAsync(promotionSpec);
            foreach (var promotion in promotions)
            {
                if(promotion.Status == true && CheckPromotionStatus(promotion) == false)
                {
                    await UpdateExpiredPromotionAsync(promotion);
                }
            }
            return promotions;
        }

        //Get indate promotion by code
        // If promotion is expired, return null
        public async Task<Promotion> GetPromotionByCodeAsync(string code)
        {
            var spec = new PromotionSpecification(code);
            var promotion = await _unitOfWork.Repository<Promotion>().GetEntityWithSpec(spec);
            if(promotion.Status == true && CheckPromotionStatus(promotion) == true)
            {
                return promotion;
            }
            else{
                await UpdateExpiredPromotionAsync(promotion);
                return null;
            }
        }

        // Add new promotion
        public async Task<Promotion> AddNewPromotionAsync(Promotion promotion)
        {
            if (promotion != null && promotion.ExpDate.CompareTo(promotion.EffDate) > 0)
            {
                _unitOfWork.Repository<Promotion>().Add(promotion);
                var result = await _unitOfWork.Complete();
                if(result > 0) return promotion;
                else return null;
            }
            else return null;
        }

        // Get promotion by id
        public async Task<Promotion> GetPromotionByIdAsync(int id)
        {
            return await _unitOfWork.Repository<Promotion>().GetByIdAsync(id);
        }

        // Update status of expired promotions
        // Can be used to disable promotion status manually
        public async Task<int> UpdateExpiredPromotionAsync(Promotion promotion)
        {   
            promotion.Status = false;
            _unitOfWork.Repository<Promotion>().Update(promotion);
            return await _unitOfWork.Complete();
        }

        // Check pre-updated status of promotion
        // indate = true, expired = false
        public bool CheckPromotionStatus(Promotion promotion)
        {
            DateOnly today = DateOnly.FromDateTime(DateTime.UtcNow);
            if(promotion.Status == true && today.CompareTo(promotion.ExpDate) > 0)
                return false;
            else return true;
        }

        // Count number of promotions with spec
        public async Task<int> CountPromotionsWithSpecAsync(ISpecification<Promotion> spec)
        {
            return await _unitOfWork.Repository<Promotion>().CountAsync(spec);
        }
    }
}