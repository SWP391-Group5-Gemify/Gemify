using Core.Enitities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class ProductDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string GoldType { get; set; }
        public float GoldWeight { get; set; }
        public float TotalWeight { get; set; }
        public float Labour { get; set; }
        public string Status { get; set; }
        public int Quantity { get; set; }
        public string ImageUrl { get; set; }
        public string SubCategoryName { get; set; }
        public string CategoryName { get; set; }
        public string SaleCounterName { get; set; }
        public IReadOnlyList<ProductGemDto> Gems { get; set; }
    }
}
