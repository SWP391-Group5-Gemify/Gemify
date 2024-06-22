using Core.Attributes;

namespace API.Dtos
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }

        [Gender(ErrorMessage = "Invalid Gender")]
        public string Gender { get; set; }
        public string PhoneNumber { get; set; }
        public DateOnly DateOfBirth { get; set; }
        [UserStatus(ErrorMessage = "Invalid User Status")]
        public string Status { get; set; }
        public string Image_Url { get; set; }
        public string Address { get; set; }
        public string Role { get; set; }
    }
}
