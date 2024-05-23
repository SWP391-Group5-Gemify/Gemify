using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Core.Enitities
{
    public class Customer : BaseEntity
    {
        public string Name { get; set; }

        public Gender Gender { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public int Point { get; set; }

        public int Customer_MembershipId { get; set; }
        
        public Membership CustomerMembership { get; set; }
    }
}