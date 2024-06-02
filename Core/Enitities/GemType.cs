
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace Core.Enitities
{
    public class GemType : BaseEntity
    {
        [Column(TypeName = "nvarchar(100)"), Required]
        public string Name { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public string Description { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public float? Proportion { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string Polish { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string Symmetry { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string Fluorescence { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public float Carat { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string Cut { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string Clarity { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string Color {  get; set; }
        [Column(TypeName = "varchar(10)")]
        public string Shape { get; set; }
        [Column(TypeName = "decimal(18,2)"), Required]
        public float LatestPrice { get; set; }
        public bool IsProcurable { get; set; } = true;
        public IReadOnlyList<ProductGem> ProductGems { get; set; }
        public IReadOnlyList<Product> Products { get; set; }
    }
}
