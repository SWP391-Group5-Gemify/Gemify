namespace API.Dtos
{
    public class BasketItemDto 
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
        public string PictureUrl { get; set; } 
    }
}
