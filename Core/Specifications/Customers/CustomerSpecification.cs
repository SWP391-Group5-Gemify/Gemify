using Core.Enitities;

namespace Core.Specifications.Customers
{
    public class CustomerSpecification : BaseSpecification<Customer>
    {
        public CustomerSpecification(CustomerParams customerParams)
        : base(x =>
                (string.IsNullOrEmpty(customerParams.Search) || x.Name.ToLower().Contains
                (customerParams.Search) || x.Phone.Contains(customerParams.Search)) &&
                (!customerParams.membershipId.HasValue || x.MembershipId == customerParams.membershipId))
        {
            AddInclude(x => x.Membership);
            ApplyPaging(customerParams.PageSize * (customerParams.PageIndex - 1),
                customerParams.PageSize);

            if (!string.IsNullOrEmpty(customerParams.Sort))
            {
                switch (customerParams.Sort)
                {
                    case "pointDesc":
                        AddOrderByDescending(p => p.Point);
                        break;
                }
            }
        }

        public CustomerSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.Membership);
        }
    }
}
