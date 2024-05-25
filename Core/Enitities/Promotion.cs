using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Core.Enitities
{
    public class Promotion : BaseEntity
    {
        [Column(TypeName = "varchar(200)"), Required]
        public string Name { get; set; }

        [Column(TypeName = "Date"), Required]
        public DateOnly ExpDate { get; set; }

        [Column(TypeName = "Date"), Required]
        public DateOnly EffDate { get; set; }

        [Column(TypeName = "decimal(5, 2)"), Required]
        public decimal Discount { get; set; }

        [Column(TypeName = "varchar(100)"), Required]
        public string Code { get; set; }

        [Column(TypeName = "decimal(18, 2)"), Required]
        public decimal MinValue { get; set; }
    }

}