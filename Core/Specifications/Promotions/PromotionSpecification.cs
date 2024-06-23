using Core.Enitities;

namespace Core.Specifications.Promotions
{
    public class PromotionSpecification : BaseSpecification<Promotion>
    {
        public PromotionSpecification(string code) 
            : base(x => x.Code.ToLower().Equals(code.ToLower()) && x.Status == true)
        {

        }

        public PromotionSpecification(PromotionParams promotionParams)
            : base(x => string.IsNullOrEmpty(promotionParams.Search)
            || x.Name.ToLower().Contains(promotionParams.Search)
            || x.Code.ToLower().Contains(promotionParams.Search)
            || x.Status == promotionParams.Status)
        {
            AddOrderByDescending(x => x.EffDate);
            ApplyPaging(promotionParams.PageSize * (promotionParams.PageIndex-1),promotionParams.PageSize);
        }
    }
}