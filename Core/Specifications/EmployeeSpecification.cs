using Core.Enitities.Identity;
using Core.Interfaces;

namespace Core.Specifications
{
    public class EmployeeSpecification : BaseSpecification<User>
    {
        public EmployeeSpecification(EmployeeSpecParams employeeParams, IUserRepository userRepository) 
            : base(x =>
                (string.IsNullOrEmpty(employeeParams.Search) 
                || x.FullName.ToLower().Contains(employeeParams.Search)
                || x.PhoneNumber.Equals(employeeParams.Search)
                || x.Email.ToLower().Contains(employeeParams.Search))

                && (string.IsNullOrEmpty(employeeParams.Role)
                || userRepository.GetUserRoleAsync(x).Result.FirstOrDefault().Equals(employeeParams.Role))
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
    }
}
