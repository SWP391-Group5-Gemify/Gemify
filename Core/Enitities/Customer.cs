using System;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Enitities
{
    public class Customer : BaseEntity
    {
        [Column(TypeName = "nvarchar(100)"), Required]
        public string Name { get; set; }

        [Column(TypeName = "varchar(50)")]
        public Gender Gender { get; set; }

        [Column(TypeName = "varchar(20)"), Required]
        public string Phone { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public string Address { get; set; }

        [Required]
        public int Point { get; set; } = 0;

        public int Customer_MembershipId { get; set; }
        
        public Membership CustomerMembership { get; set; }
    }
}