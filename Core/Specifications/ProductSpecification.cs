using Core.Enitities;

namespace Core.Specifications
{
    public class ProductSpecification : BaseSpecification<Product>
    {
        public ProductSpecification(ProductParams productParams)
        :base(x =>
                (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains
                (productParams.Search)) &&
                (string.IsNullOrEmpty(productParams.Status) || x.Status.ToString() == productParams.Status) &&
                (!productParams.GoldTypeId.HasValue || x.GoldTypeId == productParams.GoldTypeId) &&
                (!productParams.SubCategoryId.HasValue || x.GoldTypeId == productParams.SubCategoryId) &&
                (!productParams.CategoryId.HasValue || x.GoldTypeId == productParams.CategoryId))
        {
            AddInclude(x => x.ProductGems);
            AddInclude(x => x.GoldType);
            AddInclude(x => x.SubCategory.Category);
            AddInclude(x => x.SaleCounter);

            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1),
                productParams.PageSize);

            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "quantityDesc":
                        AddOrderByDescending(p => p.Quantity);
                        break;
                    case "quantityAsc":
                        AddOrderBy(p => p.Quantity);
                        break;
                }
            }
        }

        public ProductSpecification(int id)
        : base(x => x.Id == id) 
        {
            AddInclude(x => x.ProductGems);
            AddInclude(x => x.GoldType);
            AddInclude(x => x.SubCategory);
            AddInclude(x => x.SaleCounter);
        }
    }
}
