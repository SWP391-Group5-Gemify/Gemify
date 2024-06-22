using Core.Attributes;

namespace API.Dtos
{
    public class ProductToAddDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int GoldTypeId { get; set; }
        public float GoldWeight { get; set; }
        public float TotalWeight { get; set; }
        public float Labour { get; set; }
        public int Quantity { get; set; }
        public string ImageUrl { get; set; }
        public int SubCategoryId { get; set; }
        public int SaleCounterId { get; set; }
        [ProductStatus(ErrorMessage = "Invalid Product Status")]
        public string Status { get; set; }
        public IReadOnlyList<ProductGemToAddDto> ProductGems { get; set; }
    }
}
