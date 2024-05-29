using System.Numerics;
using Core.Enitities;
using Core.Enitities.Identity;

namespace Core.Specifications
{
    public class GoldPriceSpecification : BaseSpecification<GoldPrice>
    { 
        public GoldPriceSpecification(GoldPriceParams goldPriceParams)
            : base(x => goldPriceParams.goldTypeId.HasValue || x.GoldTypeId == goldPriceParams.goldTypeId)
        {
            AddOrderByDescending(x => x.DateTime);
            ApplyPaging(goldPriceParams.PageSize * (goldPriceParams.PageIndex - 1),
                goldPriceParams.PageSize);
        }
    }
}