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
        [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$", 
            ErrorMessage = "Password must have 1 Uppercase, 1 Lowercase, 1 number, 1 non alphanumeric and at least 6 characters")]
        public string Password { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }

        [Gender(ErrorMessage = "Invalid Gender")]
        public string Gender { get; set; }
        public DateOnly DateOfBirth { get; set; }

        [UserStatus(ErrorMessage = "Invalid User Status")]
        public string Status { get; set; } = "Active";
        public string Image_Url { get; set; }
        public string Address { get; set; }

        [Required]
        [Role(ErrorMessage = "Invalid Role")]
        public string Role { get; set; }
    }
}
