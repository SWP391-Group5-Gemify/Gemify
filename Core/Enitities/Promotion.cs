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

        [Column(TypeName = "Date")]
        public DateOnly ExpDate { get; set; }

        [Column(TypeName = "Date")]
        public DateOnly EffDate { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal Discount { get; set; }

        [Column(TypeName = "varchar(100)"), Required]
        public string Code { get; set; }

        public bool Status { get; set; } = true;
    }

}