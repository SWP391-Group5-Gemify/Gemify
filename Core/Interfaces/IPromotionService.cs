using Core.Enitities;
using Core.Specifications;
using Core.Specifications.Promotions;

namespace Core.Interfaces
{
    public interface IPromotionService
    {
        Task<IReadOnlyList<Promotion>> GetPromotionsWithSpecAsync(PromotionSpecification promotionSpec);
        Task<Promotion> GetPromotionByCodeAsync(string code);
        Task<Promotion> AddNewPromotionAsync(Promotion promotion);
        Task<Promotion> GetPromotionByIdAsync(int id);
        Task<int> UpdateExpiredPromotionAsync(Promotion promotion);
        bool CheckPromotionStatus(Promotion promotion);
        Task<int> CountPromotionsWithSpecAsync(ISpecification<Promotion> spec);
    }
}