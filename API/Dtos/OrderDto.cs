namespace API.Dtos
{
    public class OrderDto
{
    public DateTime OrderDate { get; set; }
        public string Status { get; set; }
        public int OrderTypeId { get; set; }
        public decimal SubTotal {  get; set; }
        public int CustomerId { get; set; }
        public string Name {get; set;}
        public string Phone {get; set;}
        public int MembershipId {get; set;}
        public int UserId { get; set; }
        public string PaymentIntentId { get; set; }
        public int PromotionId { get; set; }
}

}
