using Core.Enitities;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class CustomerBasketDto
    {
        [Required]
        public string Id { get; set; }
        public int OrderTypeId { get; set; }
        public string PhoneNumber { get; set; }
        public int? PromotionId { get; set; }
        public int? MembershipId { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
        public List<BasketItem> SaleItems { get; set; }
        public List<BasketBuybackItem> BuybackItems { get; set; }
    }
}
