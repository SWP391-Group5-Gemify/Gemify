using Core.Enitities;

namespace Core.Specifications
{
    public class ProductSpecification : BaseSpecification<Product>
    {
        public ProductSpecification(ProductParams productParams)
        : base(x => 
        //string statusString = x.Status.ToString();
        (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains
        (productParams.Search)) &&
        (string.IsNullOrEmpty(productParams.Status) || x.Status.Equals((ProductStatus)Enum.Parse(typeof(ProductStatus), productParams.Status))) &&
        (!productParams.GoldTypeId.HasValue || x.GoldTypeId == productParams.GoldTypeId) &&
        (!productParams.SubCategoryId.HasValue || x.SubCategoryId == productParams.SubCategoryId) &&
        (!productParams.CategoryId.HasValue || x.SubCategory.CategoryId == productParams.CategoryId))
        {
            AddInclude(x => x.ProductGems);
            AddInclude(x => x.Gems);
            AddInclude(x => x.GoldType);
            AddInclude(x => x.SubCategory);
            AddInclude(x => x.SaleCounter);
            AddInclude(x => x.SubCategory.Category);

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
            AddInclude(x => x.Gems);
            AddInclude(x => x.GoldType);
            AddInclude(x => x.SubCategory);
            AddInclude(x => x.SaleCounter);
            AddInclude(x => x.SubCategory.Category);
        }
    }
}
