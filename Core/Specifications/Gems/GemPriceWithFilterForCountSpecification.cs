using Core.Enitities;

namespace Core.Specifications.Gems
{
    public class GemPriceWithFilterForCountSpecification : BaseSpecification<GemPrice>
    {
        public GemPriceWithFilterForCountSpecification(GemPriceSpecParams gemPriceSpecParams)
            : base(x =>
                x.GemTypeId == gemPriceSpecParams.GemId
                && (string.IsNullOrEmpty(gemPriceSpecParams.Datetime)
                || x.DateTime.Date.ToString().Equals(gemPriceSpecParams.Datetime))
            )
        {
        }
    }
}
