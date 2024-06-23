namespace API.Dtos
{
    public class OrderItemDto
    {
        public int Id { get; set;}
        public int ProductItemId { get; set; }
        public string ProductName { get; set; }
        public decimal GoldPrice { get; set; }
        public string GoldType { get; set; }
        public decimal GoldWeight { get; set; }
        public decimal ProductLabour {  get; set; }
        public string Unit {  get; set; }
        public string Image_Url { get; set; }
        public string SaleCounterName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public IReadOnlyList<OrderItemGemDto> OrderItemGems {get; set;}
    }
}
