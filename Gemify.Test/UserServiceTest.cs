using Core.Enitities.Identity;
using Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MockQueryable.Moq;
using Moq;
using System.Linq.Expressions;
using System.Security.Claims;

namespace Gemify.Test
{
    public class UserServiceTest
    {
        /**
         * ==============================
         *      GET CURRENT USER
         * ==============================
         **/
        [Test]
        public async Task GetUserByClaimsEmail_ShouldReturnTheUser_IfHavingTheSameEmailClaim() 
        {
            // Arrange
            var mockUserManager = new Mock<UserManager<User>>(Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            var mockRoleManager = new Mock<RoleManager<IdentityRole<int>>>(Mock.Of<IRoleStore<IdentityRole<int>>>(), null, null, null, null);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, "duy@test.com"),
                new Claim(ClaimTypes.Name, "Vu Kim Duy"),
                new Claim(ClaimTypes.Role, "Seller")
            };

            var claimIdentity = new ClaimsIdentity(claims);

            var userClaim = new ClaimsPrincipal(claimIdentity);

            var users = new List<User>()
            {
                new User()
                {
                    Id = 1,
                    FullName = "Vu Kim Duy",
                    Email = "duy@test.com",
                    UserName = "duyseller",
                    Gender = "Male",
                    PhoneNumber = "0909 189 222",
                    DateOfBirth = new DateOnly(2000, 04, 01),
                    Status = "Active",
                    Image_Url = "wwwroot/duy.png",
                    Address = "The Ruong Resort",
                }
            };

            var mockUsers = users.BuildMock();

            mockUserManager.Setup(m => m.Users).Returns(mockUsers);

            var userService = new UserService(mockUserManager.Object, mockRoleManager.Object);
            
            // Act
            var user = await userService.GetUserByClaimsEmailAsync(userClaim);
            

            // Assert
            Assert.That(1, Is.EqualTo(user.Id));
            Assert.That(user.Email, Is.EqualTo("duy@test.com"));
        }

        /**
         * ==============================
         *          LOGIN LOGIC
         * ==============================
         **/
        [Test]
        public async Task GetUserNameByUserName_ShouldReturnUserObject_WhenUserExist()
        {
            // Arrange
            var mockUserManager = new Mock<UserManager<User>>(Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            var mockRoleManager = new Mock<RoleManager<IdentityRole<int>>>(Mock.Of<IRoleStore<IdentityRole<int>>>(), null, null, null, null);
            var userName = "duyseller";

            var expectedUser = new User
            {
                Id = 1,
                FullName = "Vu Kim Duy",
                Email = "duy@test.com",
                UserName = "duyseller",
                Gender = "Male",
                PhoneNumber = "0909 189 222",
                DateOfBirth = new DateOnly(2000, 04, 01),
                Status = "Active",
                Image_Url = "wwwroot/duy.png",
                Address = "The Ruong Resort",
            };

            // Create a mock userManager that returns expected output
            // as there is a user exist with that username
            mockUserManager.Setup(m => m.FindByNameAsync(userName))
                .ReturnsAsync(expectedUser);

            var userService = new UserService(mockUserManager.Object, mockRoleManager.Object);

            // Act
            var user = await userService.GetUserByUserNameAsync(userName);

            // Assert
            Assert.AreEqual(expectedUser, user);
        }

        [Test]
        public async Task GetUserNameByUserName_ShouldReturnNull_WhenUserDoesntExist()
        {
            // Arrange
            var mockUserManager = new Mock<UserManager<User>>(Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            var mockRoleManager = new Mock<RoleManager<IdentityRole<int>>>(Mock.Of<IRoleStore<IdentityRole<int>>>(), null, null, null, null);
            var userName = "duysell";

            // Create a mock userManager that returns expected 
            // FindByNameAsync(userName) returns null because no user found with that username
            mockUserManager.Setup(m => m.FindByNameAsync(userName))
                .ReturnsAsync((User) null);

            var userService = new UserService(mockUserManager.Object, mockRoleManager.Object);

            // Act
            var user = await userService.GetUserByUserNameAsync(userName);

            // Assert
            Assert.IsNull(user);
        }

        [Test]
        public async Task GetUserRoleAsync_ShouldReturnUserRole_WhenUserHasRoles()
        {
            // Arrange
            var mockUserManager = new Mock<UserManager<User>>(Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            var mockRoleManager = new Mock<RoleManager<IdentityRole<int>>>(Mock.Of<IRoleStore<IdentityRole<int>>>(), null, null, null, null);
            List<string> expectedRoles = new List<string>() { "Seller" };
            var expectedRole = expectedRoles.FirstOrDefault();

            var sellerUser = new User
            {
                Id = 1,
                FullName = "Vu Kim Duy",
                Email = "duy@test.com",
                UserName = "duyseller",
                Gender = "Male",
                PhoneNumber = "0909 189 222",
                DateOfBirth = new DateOnly(2000, 04, 01),
                Status = "Active",
                Image_Url = "wwwroot/duy.png",
                Address = "The Ruong Resort",
            };

            // Create a mock userManager that returns expected output
            // GetRolesAsync(sellerUser) returns "Seller"
            mockUserManager.Setup(m => m.GetRolesAsync(sellerUser))
                .ReturnsAsync(expectedRoles);

            var userService = new UserService(mockUserManager.Object, mockRoleManager.Object);

            // Act
            var role = await userService.GetUserRoleAsync(sellerUser);

            // Assert
            Assert.AreEqual(role, expectedRole);
        }

        [Test]
        public async Task GetUserRoleAsync_ShouldReturnEmptyList_WhenUserHasNoRoles()
        {
            // Arrange
            var mockUserManager = new Mock<UserManager<User>>(Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            var mockRoleManager = new Mock<RoleManager<IdentityRole<int>>>(Mock.Of<IRoleStore<IdentityRole<int>>>(), null, null, null, null);
            List<string> expectedRoles = new List<string>();
            var expectedRole = expectedRoles.FirstOrDefault();

            var noRoleUser = new User
            {
                Id = 1,
                FullName = "Vu Kim Duy",
                Email = "duy@test.com",
                UserName = "duyseller",
                Gender = "Male",
                PhoneNumber = "0909 189 222",
                DateOfBirth = new DateOnly(2000, 04, 01),
                Status = "Active",
                Image_Url = "wwwroot/duy.png",
                Address = "The Ruong Resort",
            };

            // Create a mock userManager that returns expected output
            // GetRolesAsync(noRoleUser) returns an empty string because user has no roles
            mockUserManager.Setup(m => m.GetRolesAsync(noRoleUser))
                .ReturnsAsync(new List<string>());

            var userService = new UserService(mockUserManager.Object, mockRoleManager.Object);

            // Act
            var role = await userService.GetUserRoleAsync(noRoleUser);

            // Assert
            Assert.AreEqual(role, expectedRole);
        }

        /**
         * ==================================
         *           REGISTER LOGIC
         * ==================================
         **/
        [Test]
        public async Task CreateUserAsync_ShouldReturnIdentityResultSucceeded_WhenCreateSucceeded()
        {
            // Arrange
            var mockUserManager = new Mock<UserManager<User>>(Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            var mockRoleManager = new Mock<RoleManager<IdentityRole<int>>>(Mock.Of<IRoleStore<IdentityRole<int>>>(), null, null, null, null);

            var user = new User
            {
                Id = 1,
                FullName = "Vu Kim Duy",
                Email = "duy@test.com",
                UserName = "duyseller",
                Gender = "Male",
                PhoneNumber = "0909 189 222",
                DateOfBirth = new DateOnly(2000, 04, 01),
                Status = "Active",
                Image_Url = "wwwroot/duy.png",
                Address = "The Ruong Resort",
            };

            // Create a mock userManager that returns expected output
            // CreateAsync(user, "duy123456") returns a succeeded IdentityResult
            mockUserManager.Setup(m => m.CreateAsync(user, "duy123456")).ReturnsAsync(IdentityResult.Success);

            var userService = new UserService(mockUserManager.Object, mockRoleManager.Object);

            // Act
            var identityResult = await userService.CreateUserAsync(user, "duy123456");

            // Assert
            Assert.True(identityResult.Succeeded);
        }

        [Test]
        public async Task CreateUserAsync_ShouldReturnIdentityResultFailed_WhenCreateFailed()
        {
            // Arrange
            var mockUserManager = new Mock<UserManager<User>>(Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            var mockRoleManager = new Mock<RoleManager<IdentityRole<int>>>(Mock.Of<IRoleStore<IdentityRole<int>>>(), null, null, null, null);

            var user = new User
            {
                Id = 1,
                FullName = "Vu Kim Duy",
                Email = "duy@test.com",
                UserName = "duyseller",
                Gender = "Male",
                PhoneNumber = "0909 189 222",
                DateOfBirth = new DateOnly(2000, 04, 01),
                Status = "Active",
                Image_Url = "wwwroot/duy.png",
                Address = "The Ruong Resort",
            };

            var failedResult = IdentityResult.Failed(new IdentityError[]
            {
                new IdentityError { Code = "CreateFailed", Description = "Create user failed." }
            });

            // Create a mock userManager that returns expected output
            // CreateAsync(user, "duy 1234") returns a failed IdentityResult because password contains whitespace
            mockUserManager.Setup(m => m.CreateAsync(user, "duy 1234")).ReturnsAsync(failedResult);

            var userService = new UserService(mockUserManager.Object, mockRoleManager.Object);

            // Act
            var identityResult = await userService.CreateUserAsync(user, "duy 1234");

            // Assert
            Assert.False(identityResult.Succeeded);
        }

        [Test]
        public async Task AddUserToRoleAsync_ShouldReturnIdentityResultSucceeded_WhenAddSucceeded()
        {
            // Arrange
            var mockUserManager = new Mock<UserManager<User>>(Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            var mockRoleManager = new Mock<RoleManager<IdentityRole<int>>>(Mock.Of<IRoleStore<IdentityRole<int>>>(), null, null, null, null);

            var user = new User
            {
                Id = 1,
                FullName = "Vu Kim Duy",
                Email = "duy@test.com",
                UserName = "duyseller",
                Gender = "Male",
                PhoneNumber = "0909 189 222",
                DateOfBirth = new DateOnly(2000, 04, 01),
                Status = "Active",
                Image_Url = "wwwroot/duy.png",
                Address = "The Ruong Resort",
            };

            // Create a mock userManager that returns expected output
            // AddToRoleAsync(user, "Seller") returns a succeeded IdentityResult
            mockUserManager.Setup(m => m.AddToRoleAsync(user, "Seller")).ReturnsAsync(IdentityResult.Success);

            var userService = new UserService(mockUserManager.Object, mockRoleManager.Object);

            // Act
            var identityResult = await userService.AddUserToRoleAsync(user, "Seller");

            // Assert
            Assert.True(identityResult.Succeeded);
        }

        [Test]
        public async Task AddUserToRoleAsync_ShouldReturnIdentityResultFailed_WhenAddFailed()
        {
            // Arrange
            var mockUserManager = new Mock<UserManager<User>>(Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            var mockRoleManager = new Mock<RoleManager<IdentityRole<int>>>(Mock.Of<IRoleStore<IdentityRole<int>>>(), null, null, null, null);

            var user = new User
            {
                Id = 1,
                FullName = "Vu Kim Duy",
                Email = "duy@test.com",
                UserName = "duyseller",
                Gender = "Male",
                PhoneNumber = "0909 189 222",
                DateOfBirth = new DateOnly(2000, 04, 01),
                Status = "Active",
                Image_Url = "wwwroot/duy.png",
                Address = "The Ruong Resort",
            };

            var failedResult = IdentityResult.Failed(new IdentityError[]
            {
                new IdentityError { Code = "CreateFailed", Description = "Create user failed." }
            });

            // Create a mock userManager that returns expected output
            // AddToRoleAsync(user, "Random") returns a failed IdentityResult because Role "Random" does not exist
            mockUserManager.Setup(m => m.AddToRoleAsync(user, "Random")).ReturnsAsync(failedResult);

            var userService = new UserService(mockUserManager.Object, mockRoleManager.Object);

            // Act
            var identityResult = await userService.AddUserToRoleAsync(user, "Random");

            // Assert
            Assert.False(identityResult.Succeeded);
        }

        /**
         * ==================================
         *          EMPLOYEE MANAGEMENT
         * ==================================
         **/
        [Test]
        public async Task UpdateUserAsync_ShouldReturnIdentityResultSucceeded_WhenTheUpdateSucceeded()
        {
            // Arrange
            var mockUserManager = new Mock<UserManager<User>>(Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            var mockRoleManager = new Mock<RoleManager<IdentityRole<int>>>(Mock.Of<IRoleStore<IdentityRole<int>>>(), null, null, null, null);

            var user = new User
            {
                Id = 1,
                FullName = "Vu Kim Duy",
                Email = "duy@test.com",
                UserName = "duyseller",
                Gender = "Male",
                PhoneNumber = "0909 189 222",
                DateOfBirth = new DateOnly(2000, 04, 01),
                Status = "Closed",
                Image_Url = "wwwroot/duy.png",
                Address = "The Ruong Resort",
            };

            // Create a mock userManager that returns expected output
            // UpdateAsync(user) returns a succeeded IdentityResult
            mockUserManager.Setup(m => m.UpdateAsync(user)).ReturnsAsync(IdentityResult.Success); 

            var userService = new UserService(mockUserManager.Object, mockRoleManager.Object);

            // Act
            var identityResult = await userService.UpdateUserAsync(user);

            // Assert
            Assert.True(identityResult.Succeeded);
        }

        [Test]
        public async Task UpdateUserAsync_ShouldReturnIdentityResultFailed_WhenTheUpdateFailed()
        {
            // Arrange
            var mockUserManager = new Mock<UserManager<User>>(Mock.Of<IUserStore<User>>(), null, null, null, null, null, null, null, null);
            var mockRoleManager = new Mock<RoleManager<IdentityRole<int>>>(Mock.Of<IRoleStore<IdentityRole<int>>>(), null, null, null, null);

            var user = new User
            {
                Id = 1,
                FullName = "Vu Kim Duy",
                Email = "duy@test.com",
                UserName = "duyseller",
                Gender = "Male",
                PhoneNumber = "0909 189 222",
                DateOfBirth = new DateOnly(2000, 04, 01),
                Status = "Closed",
                Image_Url = "wwwroot/duy.png",
                Address = "The Ruong Resort",
            };

            var failedResult = IdentityResult.Failed(new IdentityError[]
            {
                new IdentityError { Code = "UpdateFailed", Description = "User update failed." }
            });

            // Create a mock userManager that returns expected output
            // UpdateAsync(user) returns a succeeded IdentityResult
            mockUserManager.Setup(m => m.UpdateAsync(user)).ReturnsAsync(failedResult);

            var userService = new UserService(mockUserManager.Object, mockRoleManager.Object);

            // Act
            var identityResult = await userService.UpdateUserAsync(user);

            // Assert
            Assert.False(identityResult.Succeeded);
        }
    }
}