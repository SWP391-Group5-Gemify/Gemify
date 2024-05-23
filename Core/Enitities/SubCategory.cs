
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace Core.Enitities
{
    public class SubCategory : BaseEntity
    {
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        [Column(TypeName = "varchar(100)"), Required]
        public string Name { get; set; }
        [Column(TypeName = "varchar(50)"), Required]
        public string Unit {  get; set; }
        public List<Product> Products { get; set; }

    }
}
