using Core.Enitities;
using Core.Enitities.Identity;
using System.Linq;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            var roles = new[] { "Admin", "Manager", "Cashier", "Appraiser", "Repurchaser", "Sales" };

            if(!roleManager.Roles.Any())
            {
                foreach(var role in roles)
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }
        }

        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    FullName = "Le Quang Khanh",
                    Email = "khanh@test.com",
                    UserName = "khanhlq",
                    Gender = Gender.Male,
                    Status = UserStatus.Active,
                    DateOfBirth = new DateOnly(2000,2,1),
                    Image_Url = "wwwroot/khanh.png",
                    Address = "Xa Lo Ha Noi"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Admin");
            }
        }
    }
}
