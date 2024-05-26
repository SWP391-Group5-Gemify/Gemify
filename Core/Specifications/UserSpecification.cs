using Core.Enitities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Core.Specifications
{
    public class UserSpecification : BaseSpecification<User>
    {
        public UserSpecification(EmployeeSpecParams employeeParams, UserManager<User> userManager) 
            : base(x =>
                (string.IsNullOrEmpty(employeeParams.Search) 
                || x.FullName.ToLower().Contains(employeeParams.Search)
                || x.PhoneNumber.Equals(employeeParams.Search)
                || x.Email.ToLower().Contains(employeeParams.Search))

                && (string.IsNullOrEmpty(employeeParams.Role)
                || userManager.GetUsersInRoleAsync(employeeParams.Role).Result.Any(u => u.Id == x.Id))
            )
        {
            AddOrderBy(x => x.FullName);
            ApplyPaging(employeeParams.PageSize * (employeeParams.PageIndex - 1), 
                employeeParams.PageSize);

            if(string.IsNullOrEmpty(employeeParams.Sort)) 
            {
                switch(employeeParams.Sort)
                {
                    case "nameAsc": 
                        AddOrderBy(x => x.FullName);
                        break;
                    case "nameDesc":
                        AddOrderByDescending(x => x.FullName);
                        break;
                    default:
                        AddOrderBy(x => x.FullName);
                        break;
                }
            }
        }

        public UserSpecification(string id) : base(x => x.Equals(id))
        {

        }
    }
}
