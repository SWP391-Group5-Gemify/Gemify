using Core.Enitities;

namespace API.Dtos
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IReadOnlyList<SubCategoryDto> SubCategories{ get; set; }
    }
}
