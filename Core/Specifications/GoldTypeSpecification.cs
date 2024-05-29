using Core.Enitities;

namespace Core.Specifications
{
    public class GoldTypeSpecification : BaseSpecification<GoldType>
    {
        public GoldTypeSpecification(int id) : base (x => x.Id == id )
        {

        }
    }
}