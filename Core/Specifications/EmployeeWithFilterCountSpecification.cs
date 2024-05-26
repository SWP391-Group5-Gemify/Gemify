using Core.Enitities.Identity;
using Core.Interfaces;

namespace Core.Specifications
{
    public class EmployeeWithFilterCountSpecification : BaseSpecification<User>
    {
        public EmployeeWithFilterCountSpecification(EmployeeSpecParams employeeParams, IUserRepository userRepository)
            : base(x =>
                (string.IsNullOrEmpty(employeeParams.Search)
                || x.FullName.ToLower().Contains(employeeParams.Search)
                || x.PhoneNumber.Equals(employeeParams.Search)
                || x.Email.ToLower().Contains(employeeParams.Search))

                && (string.IsNullOrEmpty(employeeParams.Role)
                || userRepository.GetUserRoleAsync(x).Result.Equals(employeeParams.Role))
            )
        {
        }
    }
}
