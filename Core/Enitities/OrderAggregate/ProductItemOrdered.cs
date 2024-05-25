using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Enitities.OrderAggregate
{
    public class ProductItemOrdered
    {
        public ProductItemOrdered() { }
        public ProductItemOrdered(int productItemId, string productName, decimal goldPrice,
            string goldType, decimal goldWeight, decimal productLabour, string unit, string image_Url)
        {
            ProductItemId = productItemId;
            ProductName = productName;
            GoldPrice = goldPrice;
            GoldType = goldType;
            GoldWeight = goldWeight;
            ProductLabour = productLabour;
            Unit = unit;
            Image_Url = image_Url;
        }

        [Required]
        public int ProductItemId { get; set; }
        [Column(TypeName = "nvarchar(200)"), Required]
        public string ProductName { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal GoldPrice { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string GoldType { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal GoldWeight { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal ProductLabour {  get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string Unit {  get; set; }
        [Column(TypeName = "varchar(200)")]
        public string Image_Url { get; set; }
    }
}
