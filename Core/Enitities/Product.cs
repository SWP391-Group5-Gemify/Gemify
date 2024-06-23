
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Core.Attributes;


namespace Core.Enitities
{
    public class Product : BaseEntity
    {
        [Column(TypeName = "nvarchar(200)"), Required]
        public string Name { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public string Description { get; set; }
        public int? GoldTypeId { get; set; }
        public GoldType GoldType { get; set;}
        [Column(TypeName = "decimal(18,4)")]
        public decimal GoldWeight {  get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal TotalWeight { get; set; }
        [Column(TypeName = "decimal(18,0)")]
        public decimal Labour {  get; set; }
        [ProductStatus(ErrorMessage = "Invalid Product Status")]
        [Column(TypeName = "varchar(50)"), Required]
        public string Status { get; set; }
        public int Quantity { get; set; }
        [Column(TypeName = "varchar(200)")]
        public string ImageUrl { get; set; }
        public int? SubCategoryId { get; set; }
        public SubCategory SubCategory { get; set; }
        public int SaleCounterId { get; set; }
        public SaleCounter SaleCounter { get; set; }
        public IReadOnlyList<ProductGem> ProductGems { get; set; }
        public IReadOnlyList<GemType> Gems { get; set; }

        public decimal CalculateGoldBidPrice()
        {
            return GoldWeight * GoldType.LatestBidPrice;
        }

        public decimal CalculateGoldAskPrice()
        {
            return GoldWeight * GoldType.LatestAskPrice;
        }

    }
}
