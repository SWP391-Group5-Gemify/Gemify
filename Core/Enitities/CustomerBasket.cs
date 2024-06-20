using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Enitities
{
    public class CustomerBasket
    {
        public CustomerBasket()
        {
        }
        public CustomerBasket(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public int OrderTypeId { get; set; }
        public string PhoneNumber { get; set; }
        public int? PromotionId { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
        public List<BasketItem> SaleItems { get; set; } = new List<BasketItem>();
        public List<BasketBuybackItem> BuybackItems { get; set; } = new List<BasketBuybackItem>();
    }
}
