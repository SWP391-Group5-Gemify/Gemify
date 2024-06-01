
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Enitities
{
    public class Category : BaseEntity
    {
        [Column(TypeName = "nvarchar(100)"), Required]
        public string Name { get; set; }
        public IReadOnlyList<SubCategory> SubCategories { get; set; }
    }
}
