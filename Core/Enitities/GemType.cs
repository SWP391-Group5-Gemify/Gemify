
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace Core.Enitities
{
    public class GemType : BaseEntity
    {
        [Column(TypeName = "varchar(100)"), Required]
        public string Name { get; set; }
        [Column(TypeName = "varchar(1000)")]
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
        public bool IsReal { get; set; }
    }
}
