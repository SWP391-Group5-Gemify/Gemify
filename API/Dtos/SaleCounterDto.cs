using Core.Enitities.Identity;

namespace API.Dtos
{
    public class SaleCounterDto
    {
        public int Id { get; set; } 
        public string Name { get; set; }
        public int ProductQuantity { get; set; }
        public bool Status { get; set; }
        public string EmployeeName { get; set; }
        public int EmployeeId { get; set; }

    }
}
