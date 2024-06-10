using Core.Enitities;

namespace API.Dtos
{
    public class CustomerBasketDto
    {
        public string Id { get; set; }
        public int CustomerId { get; set; }
        public int OrderTypeId { get; set; }
        public string PhoneNumber { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
        public List<BasketItem> Items { get; set; }
    }
}
