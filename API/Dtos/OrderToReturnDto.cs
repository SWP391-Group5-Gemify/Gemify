namespace API.Dtos
{
    public class OrderToReturnDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public string Status { get; set; }
        public int OrderTypeId { get; set; }
        public decimal SubTotal {  get; set; }
        public decimal Total { get; set; }
        public string Name {get; set;}
        public string Phone {get; set;}
        public int MembershipId {get; set;}
        public int UserId { get; set; }
        public string PaymentIntentId { get; set; }
        public string PromotionCode { get; set; }
        public decimal PromotionDiscount { get; set; }
        public IReadOnlyList<OrderItemDto> OrderItems { get; set; }

    }

}
