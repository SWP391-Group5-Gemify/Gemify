namespace API.Dtos
{
    public class BasketBuybackItemDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int OrderItemId { get; set; }
        public decimal GoldWeight { get; set; }
    }
}
