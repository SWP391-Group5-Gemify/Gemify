using Core.Attributes;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Enitities.Identity
{
    public class User : IdentityUser
    {
        [Column(TypeName = "nvarchar(100)"), Required]
        public string FullName { get; set; }

        [Gender(ErrorMessage = "Invalid Gender")]
        [Column(TypeName = "varchar(50)"), Required]
        public string Gender { get; set; }

        [Column(TypeName = "date"), Required]
        public DateOnly DateOfBirth { get; set; }

        [UserStatus(ErrorMessage = "Invalid User Status")]
        [Column(TypeName = "varchar(50)"), Required]
        public string Status { get; set; } = "Active";

        [Column(TypeName = "varchar(200)")]
        public string Image_Url { get; set; }

        [Column(TypeName = "nvarchar(200)"), Required]
        public string Address { get; set; }
    }
}
