using Core.Enitities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications.Products
{
    public class CategorySpecification : BaseSpecification<Category>
    {
        public CategorySpecification() : base()
        {
            AddInclude(x => x.SubCategories);
        }
    }
}
