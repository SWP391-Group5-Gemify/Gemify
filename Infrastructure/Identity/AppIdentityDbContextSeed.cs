using Core.Enitities;
using Core.Enitities.Identity;
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
                    Name = "Khanh",
                    Email = "khanh@test.com",
                    UserName = "khanhlq",
                    Gender = Gender.Male,
                    Status = UserStatus.Active,
                    Image_Url = "wwwroot/khanh.png",
                    Address = "Xa Lo Ha Noi"
                };

                await userManager.CreateAsync(user, "abq69");
            }
        }
    }
}
