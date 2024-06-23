using Core.Attributes;

namespace API.Dtos
{
    public class CustomerToAddDto
    {
        public string Name { get; set; }

        [Gender(ErrorMessage = "Invalid Gender")]
        public string Gender { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }
    }
}
