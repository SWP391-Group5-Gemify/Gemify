using Core.Enitities;

namespace Core.Specifications
{
    public class GemPriceSpecification : BaseSpecification<GemPrice>
    {
        public GemPriceSpecification(GemPriceSpecParams gemPriceSpecParams)
            : base(x => 
                (x.GemTypeId == gemPriceSpecParams.GemId)
                && (string.IsNullOrEmpty(gemPriceSpecParams.Datetime) 
                || x.DateTime.Date.ToString().Equals(gemPriceSpecParams.Datetime))
            )
        {
            AddOrderByDescending(x => x.DateTime);
            ApplyPaging(gemPriceSpecParams.PageSize * (gemPriceSpecParams.PageIndex - 1),
                gemPriceSpecParams.PageSize);

            if (!string.IsNullOrEmpty(gemPriceSpecParams.Sort))
            {
                switch (gemPriceSpecParams.Sort)
                {
                    case "dateAsc":
                        AddOrderByDescending(null);
                        AddOrderBy(x => x.DateTime);
                        break;
                    case "dateDesc":
                        AddOrderByDescending(x => x.DateTime);
                        break;
                    case "priceAsc":
                        AddOrderByDescending(null);
                        AddOrderBy(x => x.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(x => x.Price);
                        break;
                    default:
                        AddOrderByDescending(x => x.DateTime);
                        break;
                }
            }
        }
    }
}
