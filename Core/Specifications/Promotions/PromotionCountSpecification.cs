using Core.Enitities;

namespace Core.Specifications.Promotions
{
    public class PromotionCountSpecification : BaseSpecification<Promotion>
    {
        public PromotionCountSpecification(PromotionParams promotionParams)
            : base(x => string.IsNullOrEmpty(promotionParams.Search)
            || x.Name.ToLower().Contains(promotionParams.Search)
            || x.Code.ToLower().Contains(promotionParams.Search)
            || x.Status == promotionParams.Status)
        {
            
        }
    }
}