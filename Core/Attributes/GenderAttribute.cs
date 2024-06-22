using Core.Enitities;
using System.ComponentModel.DataAnnotations;

namespace Core.Attributes
{
    [AttributeUsage(AttributeTargets.Property |
        AttributeTargets.Field, AllowMultiple = false)]
    public class GenderAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value == null) return false;
            var gender = value.ToString();
            return gender == Gender.Male.ToString() 
                || gender == Gender.Female.ToString();
        }
    }
}
