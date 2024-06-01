using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class GemTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float? Proportion { get; set; }
        public string Polish { get; set; }
        public string Symmetry { get; set; }
        public string Fluorescence { get; set; }
        public float Carat { get; set; }
        public string Cut { get; set; }
        public string Clarity { get; set; }
        public string Color { get; set; }
        public string Shape { get; set; }
        public float LatestPrice { get; set; }
        public bool IsProcurable { get; set; } = true;
        public bool Status { get; set; } = true;
    }
}
