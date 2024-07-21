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
                        Email = "khanhle9344@gmail.com",
                        UserName = "khanhlq",
                        Gender = Gender.Male.GetEnumMemberValue(),
                        DateOfBirth = new DateOnly(2000, 2, 1),
                        Image_Url = "https://firebasestorage.googleapis.com/v0/b/gemify-d7e93.appspot.com/o/images%2Fusers%2Fmale-user.png",
                        PhoneNumber = "0034988493",
                        Address = "Xa Lộ Hà Nội"
                    },"khanh123456","StoreOwner"),
                    (new User
                    {
                        FullName = "Vũ Kim Duy",
                        Email = "duyvkse182407@fpt.edu.vn",
                        UserName = "duyvk",
                        Gender = Gender.Male.GetEnumMemberValue(),
                        DateOfBirth = new DateOnly(2000, 2, 1),
                        Image_Url = "https://firebasestorage.googleapis.com/v0/b/gemify-d7e93.appspot.com/o/images%2Fusers%2Fmale-user.png",
                        PhoneNumber = "0987363648",
                        Address = "Vũng Tàu"
                    },"duy123456","Cashier"),
                    (new User
                    {
                        FullName = "Lâm Tiểu My",
                        Email = "my@test.com",
                        UserName = "mylt",
                        Gender = Gender.Female.GetEnumMemberValue(),
                        DateOfBirth = new DateOnly(2000, 2, 1),
                        Image_Url = "https://firebasestorage.googleapis.com/v0/b/gemify-d7e93.appspot.com/o/images%2Fusers%2Ffemale-user.png",
                        PhoneNumber = "0034988493",
                        Address = "19 Trần Phú, Nha Trang"
                    },"my123456","StoreManager"),
                    (new User
                    {
                        FullName = "Cao Ngô Phương Khánh",
                        Email = "khanhcnp@test.com",
                        UserName = "khanhcnp",
                        Gender = Gender.Female.GetEnumMemberValue(),
                        DateOfBirth = new DateOnly(2000, 2, 1),
                        Image_Url = "https://firebasestorage.googleapis.com/v0/b/gemify-d7e93.appspot.com/o/images%2Fusers%2Ffemale-user.png",
                        PhoneNumber = "0034988493",
                        Address = "Đà Nẵng"
                    },"khanh123456","Repurchaser"),
                    (new User
                    {
                        FullName = "Phan Quang Anh",
                        Email = "anh@test.com",
                        UserName = "anhpq",
                        Gender = Gender.Male.GetEnumMemberValue(),
                        DateOfBirth = new DateOnly(2000, 2, 1),
                        Image_Url = "https://firebasestorage.googleapis.com/v0/b/gemify-d7e93.appspot.com/o/images%2Fusers%2Fmale-user.png",
                        PhoneNumber = "0034988493",
                        Address = "Hà Nội"
                    },"anh123456","Seller"),
                    (new User
                    {
                        FullName = "Lê Thị Hồng",
                        Email = "hong@test.com",
                        UserName = "honglt",
                        Gender = Gender.Female.GetEnumMemberValue(),
                        DateOfBirth = new DateOnly(2000, 2, 1),
                        Image_Url = "https://firebasestorage.googleapis.com/v0/b/gemify-d7e93.appspot.com/o/images%2Fusers%2Ffemale-user.png",
                        PhoneNumber = "0948257204",
                        Address = "Vũng Tàu"
                    },"hong123456","Seller"),
                    (new User
                    {
                        FullName = "Lê Quang Liêm",
                        Email = "liem@test.com",
                        UserName = "liemlq",
                        Gender = Gender.Male.GetEnumMemberValue(),
                        DateOfBirth = new DateOnly(2000, 2, 1),
                        Image_Url = "https://firebasestorage.googleapis.com/v0/b/gemify-d7e93.appspot.com/o/images%2Fusers%2Fmale-user.png",
                        PhoneNumber = "0904768732",
                        Address = "Vũng Tàu"
                    },"liem123456","Seller"),
                    (new User
                    {
                        FullName = "Nguyễn Văn Kháng",
                        Email = "khang@test.com",
                        UserName = "khangnv",
                        Gender = Gender.Male.GetEnumMemberValue(),
                        DateOfBirth = new DateOnly(2000, 2, 1),
                        Image_Url = "https://firebasestorage.googleapis.com/v0/b/gemify-d7e93.appspot.com/o/images%2Fusers%2Fmale-user.png",
                        PhoneNumber = "0904934493",
                        Address = "Vũng Tàu"
                    },"khang123456","Seller"),
                    (new User
                    {
                        FullName = "Trương Văn Tuấn",
                        Email = "tuan@test.com",
                        UserName = "tuanpq",
                        Gender = Gender.Male.GetEnumMemberValue(),
                        DateOfBirth = new DateOnly(2000, 2, 1),
                        Image_Url = "https://firebasestorage.googleapis.com/v0/b/gemify-d7e93.appspot.com/o/images%2Fusers%2Fmale-user.png",
                        PhoneNumber = "0904725739",
                        Address = "Vũng Tàu"
                    },"anh123456","Seller"),
                    (new User
                    {
                        FullName = "Cao Văn Ánh",
                        Email = "anhcv@test.com",
                        UserName = "anhcv",
                        Gender = Gender.Male.GetEnumMemberValue(),
                        DateOfBirth = new DateOnly(2000, 2, 1),
                        Image_Url = "https://firebasestorage.googleapis.com/v0/b/gemify-d7e93.appspot.com/o/images%2Fusers%2Ffemale-user.png",
                        PhoneNumber = "0907573631",
                        Address = "Vũng Tàu"
                    },"anh123456","Seller"),
                };

                foreach (var account in userList)
                {
                    await userManager.CreateAsync(account.user, account.password);
                    await userManager.AddToRoleAsync(account.user, account.role);
                }
            }
        }
    }
}
