using Core.Enitities;
using Core.Enitities.Identity;
using System.Linq;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    Name = "Le Quang Khanh",
                    Email = "khanh@test.com",
                    UserName = "khanhlq",
                    Citizen_Id = "23495992393",
                    Gender = Gender.Male,
                    Status = UserStatus.Active,
                    DateOfBirth = new DateOnly(2000,2,1),
                    Image_Url = "wwwroot/khanh.png",
                    Address = "Xa Lo Ha Noi"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}
