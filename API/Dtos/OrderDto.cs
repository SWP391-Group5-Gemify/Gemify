using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace API.Dtos
{
    public class OrderDto
    {
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "CustomerId is required.")]
        public int CustomerId { get; set; }
        [Required(ErrorMessage = "BasketId is required.")]
        public string BasketId { get; set; }
    }

}
