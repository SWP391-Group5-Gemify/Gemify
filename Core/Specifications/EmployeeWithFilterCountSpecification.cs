
using Core.Enitities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Core.Specifications
{
    public class EmployeeWithFilterCountSpecification : BaseSpecification<User>
    {
        public EmployeeWithFilterCountSpecification(EmployeeSpecParams employeeParams, UserManager<User> userManager)
            : base(e =>
                (string.IsNullOrEmpty(employeeParams.Search)
                || e.FullName.ToLower().Contains(employeeParams.Search)
                || e.PhoneNumber.Equals(employeeParams.Search)
                || e.Email.ToLower().Contains(employeeParams.Search))

                && (string.IsNullOrEmpty(employeeParams.Role)
                || userManager.GetUsersInRoleAsync(employeeParams.Role).Result.Any(u => u.Id == e.Id))
            )
        {
        }
    }
}
