using Core.Enitities.Identity;
using Core.Specifications;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Core.Interfaces
{
    public interface IUserService
    {
        Task<IReadOnlyList<User>> ListAllUsersAsync();
        Task<User> GetUserWithSpec(ISpecification<User> spec);
        Task<IReadOnlyList<User>> ListUsersAsync(ISpecification<User> spec, string role);
        Task<int> CountAsync(ISpecification<User> spec, string role);
        Task<IReadOnlyList<IdentityRole<int>>> GetAllRolesAsync();
        Task<User> GetUserByUserNameAsync(string username);
        Task<User> GetUserByClaimsEmailAsync(ClaimsPrincipal user);
        Task<User> GetUserByEmailAsync(string email);
        Task<string> GetUserRoleAsync(User user);
        Task<bool> HasRoleAsync(User user, string role);
        Task<IList<User>> GetUsersInRoleAsync(string role);
        Task<IdentityResult> AddUserToRoleAsync(User user, string role);
        Task<IdentityResult> CreateUserAsync(User user, string password);
        Task<IdentityResult> UpdateUserAsync(User user);
    }
}
