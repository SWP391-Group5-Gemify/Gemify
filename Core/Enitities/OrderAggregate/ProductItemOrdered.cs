using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Enitities.OrderAggregate
{
    public class ProductItemOrdered
    {
        public ProductItemOrdered() { }
        public ProductItemOrdered(int productItemId, string productName, decimal goldPrice,
            string goldType, decimal? goldWeight, decimal? productLabour, string unit, decimal? totalWeight, 
            string image_Url, int saleCounterId, string saleCounterName)
        {
            ProductItemId = productItemId;
            ProductName = productName;
            GoldPrice = goldPrice;
            GoldType = goldType;
            GoldWeight = goldWeight;
            ProductLabour = productLabour;
            Unit = unit;
            Image_Url = image_Url;
            TotalWeight = totalWeight;
            SaleCounterId = saleCounterId;
            SaleCounterName = saleCounterName;
        }

        [Required]
        public int ProductItemId { get; set; }
        [Column(TypeName = "nvarchar(200)"), Required]
        public string ProductName { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal GoldPrice { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string GoldType { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public decimal? GoldWeight { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? ProductLabour {  get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Unit {  get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public decimal? TotalWeight { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string Image_Url { get; set; }
        public int SaleCounterId { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string SaleCounterName { get; set; }

        public ProductItemOrdered Clone ()
        {
            return new ProductItemOrdered(ProductItemId, ProductName, GoldPrice, GoldType, GoldWeight,
                ProductLabour, Unit, TotalWeight, Image_Url, SaleCounterId, SaleCounterName);
        }
    }
}
