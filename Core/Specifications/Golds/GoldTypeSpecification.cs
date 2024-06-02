using Core.Enitities;

namespace Core.Specifications.Golds
{
    public class GoldTypeSpecification : BaseSpecification<GoldType>
    {
        public GoldTypeSpecification(int id) : base(x => x.Id == id)
        {

        }

        public GoldTypeSpecification(GoldTypeParams goldTypeParams)
            : base(x => string.IsNullOrEmpty(goldTypeParams.Search)
                || x.Name.ToLower().Contains(goldTypeParams.Search))
        {
            AddOrderBy(x => x.Name);
            ApplyPaging(goldTypeParams.PageSize * (goldTypeParams.PageIndex - 1),
                goldTypeParams.PageSize);
        }


    }
}