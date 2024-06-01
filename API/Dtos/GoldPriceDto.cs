namespace API.Dtos
{
    public class GoldPriceDto
    {
        public int GoldTypeId { get; set; }
        public float BidPrice { get; set; }
        public float AskPrice { get; set; }
        public DateTime DateTime { get; set; }
    }
}