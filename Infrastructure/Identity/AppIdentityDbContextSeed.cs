using Core.Enitities;
using Core.Enitities.Identity;
using Microsoft.AspNetCore.Identity;
using System.Reflection;
using System.Text.Json;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            if (!roleManager.Roles.Any())
            {
                var data = await File.ReadAllTextAsync(path + @"/Data/SeedData/UserRoleSeedData.json");

                var list = JsonSerializer.Deserialize<List<IdentityRole>>(data, options);

                foreach (var item in list)
                {
                    await roleManager.CreateAsync(item);
                }
            }

            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    FullName = "Le Quang Khanh",
                    Email = "khanh@test.com",
                    UserName = "khanhlq",
                    Gender = "Male",
                    Status = "Active",
                    DateOfBirth = new DateOnly(2000, 2, 1),
                    Image_Url = "wwwroot/khanh.png",
                    PhoneNumber = "0034988493",
                    Address = "Xa Lo Ha Noi"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "StoreOwner");
            }

        }
    }
}
