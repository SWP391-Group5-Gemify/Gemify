using Core.Enitities;

namespace Core.Specifications.Gems
{
    public class GemWithFilterForCountSpecification : BaseSpecification<GemType>
    {
        public GemWithFilterForCountSpecification(GemSpecParams gemSpecParams)
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
        }
    }
}
