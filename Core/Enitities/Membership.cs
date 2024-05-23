using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Core.Enitities
{
    public class Membership : BaseEntity
    {
        public string Name { get; set; }

        public int MinPoint { get; set; }

        public decimal Discount { get; set; }
    }
}