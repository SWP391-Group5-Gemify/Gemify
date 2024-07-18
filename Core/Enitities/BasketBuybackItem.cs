using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Enitities
{
    public class BasketBuybackItem
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal GoldWeight { get; set; }
        public int GoldTypeId { get; set; }
        public int? SubCategoryId { get; set; }
        public string PictureUrl { get; set; }
        public int? GemId { get; set; }
        public decimal? GemPrice { get; set; }
        public string? GemName { get; set; }
    }
}
