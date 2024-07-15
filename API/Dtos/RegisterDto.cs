using Core.Attributes;
using Core.Enitities;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required]
        [RegularExpression("^([a-zA-Z])[a-zA-Z_-]*[\\w_-]*[\\S]$|^([a-zA-Z])[0-9_-]*[\\S]$|^[a-zA-Z]*[\\S]$",
            ErrorMessage = "Username must start with a Alphabet, no space, no special characters except for underscore and dash")]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("^(?=.*\\d).{8,15}$",
            ErrorMessage = "Password must be between 8 and 15 digits long and include at least one numeric digit")]
        public string Password { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [Gender(ErrorMessage = "Invalid Gender")]
        public string Gender { get; set; }
        [Required]
        public DateOnly DateOfBirth { get; set; }

        [UserStatus(ErrorMessage = "Invalid User Status")]
        public string Status { get; set; } = UserStatus.Active.GetEnumMemberValue();
        public string Image_Url { get; set; }
        [Required]
        public string Address { get; set; }

        [Required]
        [Role(ErrorMessage = "Invalid Role")]
        public string Role { get; set; }
    }
}
