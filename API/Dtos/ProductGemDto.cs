namespace API.Dtos
{
    public class ProductGemDto
    {
        public int GemTypeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Proportion { get; set; }
        public string Polish { get; set; }
        public string Fluorescence { get; set; }
        public string Symmetry { get; set; }
        public decimal Carat { get; set; }
        public string Cut { get; set; }
        public string Clarity { get; set; }
        public string Color { get; set; }
        public string Shape { get; set; }
        public decimal LatestPrice { get; set; }
        public decimal GemWeight { get; set; }
        public string CertificateCode { get; set; }
        public int Quantity { get; set; }
        public decimal GemsPrice { get; set; }
    }
}
