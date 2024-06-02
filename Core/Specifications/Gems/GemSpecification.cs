using Core.Enitities;

namespace Core.Specifications.Gems
{
    public class GemSpecification : BaseSpecification<GemType>
    {
        public GemSpecification(GemSpecParams gemSpecParams)
            : base(x =>
                (string.IsNullOrEmpty(gemSpecParams.Search)
                || x.Name.ToLower().Contains(gemSpecParams.Search)
                || x.Color.ToLower().Contains(gemSpecParams.Search)
                || x.Shape.ToLower().Contains(gemSpecParams.Search)
                || x.Fluorescence.ToLower().Contains(gemSpecParams.Search)
                || x.Cut.ToLower().Equals(gemSpecParams.Search))
                && (!gemSpecParams.IsProcurable.HasValue
                || x.IsProcurable == gemSpecParams.IsProcurable)
            )
        {
            AddOrderBy(x => x.Name);
            ApplyPaging(gemSpecParams.PageSize * (gemSpecParams.PageIndex - 1),
                gemSpecParams.PageSize);

            if (!string.IsNullOrEmpty(gemSpecParams.Sort))
            {
                switch (gemSpecParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(x => x.LatestPrice);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(x => x.LatestPrice);
                        break;
                    default:
                        AddOrderBy(x => x.Name);
                        break;
                }
            }
        }

        public GemSpecification(int id)
            : base(x => x.Id == id)
        {

        }
    }
}
