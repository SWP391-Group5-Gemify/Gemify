using Core.Enitities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class SubCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Unit { get; set; }
    }
}
