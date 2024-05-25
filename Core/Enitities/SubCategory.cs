
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace Core.Enitities
{
    public class SubCategory : BaseEntity
    {
        [Required]
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        [Column(TypeName = "nvarchar(100)"), Required]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(50)"), Required]
        public string Unit {  get; set; }

    }
}
