using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Core.Enitities.Identity
{
    public class AppUser : IdentityUser
    {
        public string Name { get; set; }
        public string Citizen_Id { get; set; }
        public Gender Gender { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public UserStatus Status { get; set; }
        public string Image_Url { get; set; }
        public string Address { get; set; }
    }
}
