using Core.Enitities;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class BasketBuybackItemDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string ProductName { get; set; }
        [Required]
        [Range(0.1, double.MaxValue, ErrorMessage = "Price must be greater than zero")]
        public decimal Price { get; set; }
        [Required]
        [Range(1, double.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; }
        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Gold Weight must be at least 0")]
        public decimal GoldWeight { get; set; }
        public int GoldTypeId { get; set; }
        public int? SubCategoryId { get; set; }
        public string PictureUrl { get; set; }
        public List<BasketBuyBackItemGem> Gems { get; set; }
    }
}
