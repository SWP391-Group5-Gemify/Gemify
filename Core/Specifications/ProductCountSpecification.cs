

using Core.Enitities;

namespace Core.Specifications
{
    public class ProductCountSpecification : BaseSpecification<Product>
    {
        public ProductCountSpecification(ProductParams productParams)
        : base (x =>
                (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains
                (productParams.Search)) &&
                (string.IsNullOrEmpty(productParams.Status) || x.Status.ToString() == productParams.Status) &&
                (!productParams.GoldTypeId.HasValue || x.GoldTypeId == productParams.GoldTypeId) &&
                (!productParams.SubCategoryId.HasValue || x.GoldTypeId == productParams.SubCategoryId) &&
                (!productParams.CategoryId.HasValue || x.GoldTypeId == productParams.CategoryId))
        {

        }
    }
}
