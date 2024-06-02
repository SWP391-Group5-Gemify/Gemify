using Core.Enitities;

namespace Core.Specifications.Golds
{
    public class GoldPriceWithFilterForCountSpecification : BaseSpecification<GoldPrice>
    {
        public GoldPriceWithFilterForCountSpecification(GoldPriceParams goldPriceParams)
            : base(x => goldPriceParams.goldTypeId.HasValue
                    && x.GoldTypeId == goldPriceParams.goldTypeId)
        {

        }

        public GoldPriceWithFilterForCountSpecification(int goldTypeId)
            : base(x => x.Id == goldTypeId)
        {

        }

    }
}