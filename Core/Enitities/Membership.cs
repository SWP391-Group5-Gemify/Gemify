using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Enitities
{
    public class Membership : BaseEntity
    {
        [Column(TypeName = "varchar(50)"), Required]
        public string Name { get; set; }

        [Required]
        public int MinPoint { get; set; }

        [Column(TypeName = "decimal(5, 2)"), Required]
        public decimal Discount { get; set; }
    }
}