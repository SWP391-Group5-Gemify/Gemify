using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Enitities.OrderAggregate
{
    public class ProductItemOrdered
    {
        public ProductItemOrdered() { }
        public ProductItemOrdered(int productItemId, string productName, decimal goldPrice, int goldTypeId,
            string goldTypeName, decimal goldWeight, decimal productLabour, string unit, decimal totalWeight, 
            string image_Url, int? saleCounterId, string saleCounterName)
        {
            ProductItemId = productItemId;
            ProductName = productName;
            GoldPrice = goldPrice;
            GoldTypeId = goldTypeId;
            GoldTypeName = goldTypeName;
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
        public int GoldTypeId { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string GoldTypeName { get; set; }
        [Column(TypeName = "decimal(18, 4)")]
        public decimal GoldWeight { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal ProductLabour {  get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Unit {  get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public decimal TotalWeight { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string Image_Url { get; set; }
        public int? SaleCounterId { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string SaleCounterName { get; set; }

        public ProductItemOrdered Clone ()
        {
            return new ProductItemOrdered(ProductItemId, ProductName, GoldPrice, GoldTypeId, GoldTypeName, GoldWeight,
                ProductLabour, Unit, TotalWeight, Image_Url, SaleCounterId, SaleCounterName);
        }
    }
}
