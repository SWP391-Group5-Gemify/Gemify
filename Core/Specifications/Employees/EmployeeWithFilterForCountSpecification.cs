using Core.Enitities.Identity;

namespace Core.Specifications.Employees
{
    public class EmployeeWithFilterForCountSpecification : BaseSpecification<User>
    {
        public EmployeeWithFilterForCountSpecification(EmployeeSpecParams employeeParams)
            : base(x =>
                string.IsNullOrEmpty(employeeParams.Search)
                || x.FullName.ToLower().Contains(employeeParams.Search)
                || x.PhoneNumber.Equals(employeeParams.Search)
                || x.Email.ToLower().Contains(employeeParams.Search)
            )
        {
        }
    }
}
