using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Enitities.OrderAggregate
{
    public class ProductGemsItemOrdered
    {
        ProductGemsItemOrdered() { }
        public ProductGemsItemOrdered(string gemName, string gemColor, decimal gemWeight,
            decimal gemPrice, decimal gemCarat, string gemClarity, string gemCertificateCode)
        {
            GemName = gemName;
            GemColor = gemColor;
            GemWeight = gemWeight;
            GemPrice = gemPrice;
            GemCarat = gemCarat;
            GemClarity = gemClarity;
            GemCertificateCode = gemCertificateCode;
        }
        [Column(TypeName = "nvarchar(100)")]
        public string GemName { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string GemColor { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal GemWeight { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal GemPrice { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal GemCarat {  get; set; }
        [Column(TypeName = "varchar(10)")]
        public string GemClarity { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string GemCertificateCode { get; set; }
    }
}
