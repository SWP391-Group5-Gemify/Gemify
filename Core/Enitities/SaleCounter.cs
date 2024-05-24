
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Enitities
{
    public class SaleCounter : BaseEntity
    {
        [Column(TypeName = "varchar(50)"), Required]
        public string Name { get; set; }
        public int? ProductQuantity { get; set; }
        public List<Product> Products { get; set; }
    }
}
