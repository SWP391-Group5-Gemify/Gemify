using Core.Enitities;

namespace Core.Specifications.Golds
{
    public class GoldPriceSpecification : BaseSpecification<GoldPrice>
    {
        public GoldPriceSpecification(GoldPriceParams goldPriceParams)
            : base(x => goldPriceParams.goldTypeId.HasValue
                    && x.GoldTypeId == goldPriceParams.goldTypeId)
        {
            AddOrderByDescending(x => x.DateTime);
            ApplyPaging(goldPriceParams.PageSize * (goldPriceParams.PageIndex - 1),
                goldPriceParams.PageSize);
        }

        public GoldPriceSpecification(int goldTypeId)
            : base(x => x.Id == goldTypeId)
        {

        }

    }
}