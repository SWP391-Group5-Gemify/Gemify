using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Enitities
{
    public class User : BaseEntity
    {
        public string Name { get; set; }

        public string Username { get; set; }

        public string CitizenId { get; set; }

        public string Gender { get; set; }

        public string Phone { get; set; }

        public DateOnly DateOfBirth { get; set; }

        public string Status { get; set; }

        public string Hash_Password { get; set; }

        public string Image_Url { get; set; }

        public string Role { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }
    }
}