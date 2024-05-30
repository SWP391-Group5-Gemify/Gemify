
using Core.Enitities;
using System.ComponentModel.DataAnnotations;

namespace Core.Attributes
{
    [AttributeUsage(AttributeTargets.Property |
        AttributeTargets.Field, AllowMultiple = false)]
    public class ProductStatusAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value == null) return false;
            var productStatus = value.ToString();
            return productStatus == ProductStatus.New.ToString()
                || productStatus == ProductStatus.Old.ToString()
                || productStatus == ProductStatus.Unavailable.ToString();
        }
    }
}
