using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Core.Enitities
{
    public class Promotion :BaseEntity
    {
        public string Name { get; set; }

        public DateOnly ExpDate { get; set; }

        public DateOnly EffDate { get; set; }

        public decimal Discount { get; set; }

        public string Code { get; set; }

        public decimal MinValue { get; set; }
    }

}