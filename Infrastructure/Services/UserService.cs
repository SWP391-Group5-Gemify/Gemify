using Azure.Core;
using Core.Enitities.Identity;
using Core.Interfaces;
using Core.Models;
using Core.Specifications;
using Core.Specifications.Employees;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Security.Claims;

namespace Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;

        public UserService(UserManager<User> userManager, RoleManager<IdentityRole<int>> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<IdentityResult> AddUserToRoleAsync(User user, string role)
        {
            return await _userManager.AddToRoleAsync(user, role);
        }

        public async Task<IdentityResult> CreateUserAsync(User user, string password)
        {
            return await _userManager.CreateAsync(user, password);
        }

        public async Task<IReadOnlyList<IdentityRole<int>>> GetAllRolesAsync()
        {
            return await _roleManager.Roles.ToListAsync();
        }

        public async Task<User> GetUserByClaimsEmailAsync(ClaimsPrincipal user)
        {
            return await _userManager.Users
                .SingleOrDefaultAsync(x => x.Email == user.FindFirstValue(ClaimTypes.Email));
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<User> GetUserByUserNameAsync(string username)
        {
            return await _userManager.FindByNameAsync(username);
        }

        public async Task<string> GetUserRoleAsync(User user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);
            var userRole = userRoles.FirstOrDefault();
            return userRole;
        }

        public async Task<bool> HasRoleAsync(User user, string role)
        {
            return await _userManager.IsInRoleAsync(user, role);
        }

        public async Task<IList<User>> GetUsersInRoleAsync(string role)
        {
            return await _userManager.GetUsersInRoleAsync(role);
        }

        public async Task<User> GetUserWithSpec(ISpecification<User> spec)
        {
            return await ApplySpecification(_userManager.Users.AsQueryable(), spec).FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<User>> ListAllUsersAsync()
        {
            return await _userManager.Users.ToListAsync();
        }

        public async Task<IReadOnlyList<User>> ListUsersAsync(ISpecification<User> spec, int? roleId)
        {
            var query = _userManager.Users.AsQueryable();

            if(roleId.HasValue)
            {
                var role = await _roleManager.Roles.FirstOrDefaultAsync(r => r.Id == roleId);

                // Return an empty user list if role is not found
                if (role == null) return Array.Empty<User>();

                var usersWithRole = await _userManager.GetUsersInRoleAsync(role.Name);

                // Filter the query to only include users in the retrieved role list
                query = query.Where(u => usersWithRole.Contains(u));
            }

            return await ApplySpecification(query, spec).ToListAsync();
        }

        public async Task<int> CountAsync(ISpecification<User> spec, int? roleId)
        {
            var query = _userManager.Users.AsQueryable();

            if(roleId.HasValue)
            {
                var role = await _roleManager.Roles.FirstOrDefaultAsync(r => r.Id == roleId);

                // Return an empty user list if role is not found
                if (role == null) return 0;

                var usersWithRole = await _userManager.GetUsersInRoleAsync(role.Name);

                // Filter the query to only include users in the retrieved role list
                query = query.Where(u => usersWithRole.Contains(u));
            }

            return await ApplySpecification(query, spec).CountAsync();
        }

        public async Task<IdentityResult> UpdateUserAsync(User user)
        {
            return await _userManager.UpdateAsync(user);
        }

        private IQueryable<User> ApplySpecification(IQueryable<User> query, ISpecification<User> spec)
        {
            return EmployeeSpecificationEvaluator.GetQuery(query, spec);
        }

        public async Task<string> GenerateResetPasswordTokenAsync([Required] string email)
        {
            var user = await GetUserByEmailAsync(email);
            if (user == null) return null;
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            return token;
        }

        public async Task<IdentityResult> ResetPasswordAsync(ResetPassword resetPassword)
        {
            var user = await GetUserByEmailAsync(resetPassword.Email);
            if (user == null) return null;
            var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);
            if (!resetPassResult.Succeeded)
            {
                return null;
            }
            return resetPassResult;
        }
    }
}
