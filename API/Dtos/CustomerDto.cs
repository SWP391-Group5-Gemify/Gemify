using Core.Enitities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Gender Gender { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public int Point { get; set; } = 0;

        public int MembershipId { get; set; }

        public string MembershipRate { get; set; }
    }
}
