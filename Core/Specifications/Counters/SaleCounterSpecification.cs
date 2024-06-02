using Core.Enitities;
using Microsoft.EntityFrameworkCore.Query;

namespace Core.Specifications.Counters
{
    public class SaleCounterSpecification : BaseSpecification<SaleCounter>
    {
        public SaleCounterSpecification(SaleCounterParams saleCounterParams)
            : base(x =>
                (string.IsNullOrEmpty(saleCounterParams.Search) || x.Name.ToLower().Contains
                (saleCounterParams.Search)) &&
                (!saleCounterParams.Status.HasValue || x.Status == saleCounterParams.Status))
        {
            Console.WriteLine(saleCounterParams.Status.HasValue);
            AddInclude(x => x.User);
        }

        public SaleCounterSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.User);
        }
    }
}
