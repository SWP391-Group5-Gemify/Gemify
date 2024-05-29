

using Core.Enitities;
using System.Linq.Expressions;

namespace Core.Specifications
{
    public class ProductCountSpecification : BaseSpecification<Product>
    {
        public ProductCountSpecification(ProductParams productParams)
        : base (x =>(string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains
            (productParams.Search)) &&
            (string.IsNullOrEmpty(productParams.Status) || x.Status == productParams.Status) &&
            (!productParams.GoldTypeId.HasValue || x.GoldTypeId == productParams.GoldTypeId) &&
            (!productParams.SubCategoryId.HasValue || x.SubCategoryId == productParams.SubCategoryId) &&
            (!productParams.CategoryId.HasValue || x.SubCategory.CategoryId == productParams.CategoryId))
        {

        }
    }
}
