using Core.Enitities;
using Core.Enitities.Identity;
using Microsoft.AspNetCore.Identity;
using System.Reflection;
using System.Text.Json;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedAsync(UserManager<User> userManager, RoleManager<IdentityRole<int>> roleManager)
        {
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            if (!roleManager.Roles.Any())
            {
                var data = await File.ReadAllTextAsync(path + @"/Data/SeedData/UserRoleSeedData.json");

                var list = JsonSerializer.Deserialize<List<IdentityRole<int>>>(data, options);

                foreach (var item in list)
                {
                    await roleManager.CreateAsync(item);
                }
            }

            if (!userManager.Users.Any())
            {
                var userList = new List<(User user, string password, string role)>
                {
                    (new User
                    {
                        FullName = "Lê Quang Khánh",
                        Email = "khanh@test.com",
                        UserName = "khanhlq",
                        Gender = "Nam",
                        Status = "Active",
                        DateOfBirth = new DateOnly(2000, 2, 1),
                        Image_Url = "wwwroot/khanh.png",
                        PhoneNumber = "0034988493",
                        Address = "Xa Lộ Hà Nội"
                    },"khanh1234","StoreOwner"),
                    (new User
                    {
                        FullName = "Vũ Kim Duy",
                        Email = "duy@test.com",
                        UserName = "duyvk",
                        Gender = "Nam",
                        Status = "Active",
                        DateOfBirth = new DateOnly(2000, 2, 1),
                        Image_Url = "wwwroot/khanh.png",
                        PhoneNumber = "0034988493",
                        Address = "Vũng Tàu"
                    },"duy1234","Cashier"),
                    (new User
                    {
                        FullName = "Lâm Tiểu My",
                        Email = "my@test.com",
                        UserName = "mylt",
                        Gender = "Nữ",
                        Status = "Active",
                        DateOfBirth = new DateOnly(2000, 2, 1),
                        Image_Url = "wwwroot/khanh.png",
                        PhoneNumber = "0034988493",
                        Address = "19 Trần Phú, Nha Trang"
                    },"my1234","StoreOwner"),
                    (new User
                    {
                        FullName = "Cao Ngô Phương Khánh",
                        Email = "khanh@test.com",
                        UserName = "khanhcnp",
                        Gender = "Nữ",
                        Status = "Active",
                        DateOfBirth = new DateOnly(2000, 2, 1),
                        Image_Url = "wwwroot/khanh.png",
                        PhoneNumber = "0034988493",
                        Address = "Đà Nẵng"
                    },"khanh1234","Repurchaser"),
                    (new User
                    {
                        FullName = "Phan Quang anh",
                        Email = "anh@test.com",
                        UserName = "anhpq",
                        Gender = "Nam",
                        Status = "Active",
                        DateOfBirth = new DateOnly(2000, 2, 1),
                        Image_Url = "wwwroot/khanh.png",
                        PhoneNumber = "0034988493",
                        Address = "Hà Nội"
                    },"anh1234","Seller"),
                };
                
                foreach (var (user,password,role) in userList)
                {
                    await userManager.CreateAsync(user, password);
                    await userManager.AddToRoleAsync(user, role);
                }
                
            }

        }
    }
}
