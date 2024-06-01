using Core.Enitities;

namespace Core.Specifications
{
    public class GoldTypeWithFilterForCountSpecification : BaseSpecification<GoldType>
    {

        public GoldTypeWithFilterForCountSpecification(GoldTypeParams goldTypeParams)
            : base (x => string.IsNullOrEmpty(goldTypeParams.Search)
                || x.Name.ToLower().Contains(goldTypeParams.Search))              
        {
           
        }


    }
}
