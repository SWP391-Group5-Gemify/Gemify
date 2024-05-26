using Core.Enitities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Core.Specifications
{
    public class EmployeeSpecification : BaseSpecification<User>
    {
        public EmployeeSpecification(EmployeeSpecParams employeeParams, UserManager<User> userManager) 
            : base(e =>
                (string.IsNullOrEmpty(employeeParams.Search) 
                || e.FullName.ToLower().Contains(employeeParams.Search)
                || e.PhoneNumber.Equals(employeeParams.Search)
                || e.Email.ToLower().Contains(employeeParams.Search))

                && (string.IsNullOrEmpty(employeeParams.Role)
                || userManager.GetUsersInRoleAsync(employeeParams.Role).Result.Any(u => u.Id == e.Id))
            )
        {
            AddOrderBy(e => e.FullName);
            ApplyPaging(employeeParams.PageSize * (employeeParams.PageIndex - 1), 
                employeeParams.PageSize);

            if(string.IsNullOrEmpty(employeeParams.Sort)) 
            {
                switch(employeeParams.Sort)
                {
                    case "nameAsc": 
                        AddOrderBy(e => e.FullName);
                        break;
                    case "nameDesc":
                        AddOrderByDescending(e => e.FullName);
                        break;
                    default:
                        AddOrderBy(e => e.FullName);
                        break;
                }
            }
        }

        public EmployeeSpecification(string id) : base(e => e.Equals(id))
        {

        }
    }
}
