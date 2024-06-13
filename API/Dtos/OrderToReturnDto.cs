using Core.Attributes;
using Core.Enitities.Identity;
using Core.Enitities.OrderAggregate;
using Core.Enitities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class OrderToReturnDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public string Status { get; set; }
        public string OrderType { get; set; }
        public decimal SubTotal { get; set; } 
        public CustomerDto Customer { get; set; }
        public UserDto User { get; set; }
        public string PaymentIntentId { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        public Promotion Promotion { get; set; }

    }
}
