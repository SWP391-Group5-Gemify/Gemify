using Core.Enitities;
using System.ComponentModel;

namespace Core.Specifications.Customers
{
    public class CustomerCountSpecification : BaseSpecification<Customer>
    {
        public CustomerCountSpecification(CustomerParams customerParams)
            : base(x =>
                (string.IsNullOrEmpty(customerParams.Search) || x.Name.ToLower().Contains
                (customerParams.Search) || x.Phone.Contains(customerParams.Search)) &&
                (!customerParams.membershipId.HasValue || x.MembershipId == customerParams.membershipId))
        { }

    }
}
