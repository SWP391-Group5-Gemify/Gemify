using Core.Enitities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications.Counters
{
    public class SaleCounterWithUniqueEmployeeIdSpecification : BaseSpecification<SaleCounter>
    {
        public SaleCounterWithUniqueEmployeeIdSpecification(int userId) : base(x => x.UserId == userId) 
        {
        }
    }
}
