using Core.Enitities;
using Core.Attributes;

namespace API.Dtos
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [Gender(ErrorMessage = "Invalid Gender")]
        public string Gender { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public int Point { get; set; } = 0;

        public int MembershipId { get; set; }

        public string MembershipRate { get; set; }
    }
}
