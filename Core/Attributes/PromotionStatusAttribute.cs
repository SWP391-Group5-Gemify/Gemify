
using Core.Enitities;
using System.ComponentModel.DataAnnotations;

namespace Core.Attributes
{
    [AttributeUsage(AttributeTargets.Property |
        AttributeTargets.Field, AllowMultiple = false)]
    public class PromotionStatusAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value == null) return false;
            var promotionStatus = value.ToString();
            return promotionStatus == PromotionStatus.Active.GetEnumMemberValue()
                || promotionStatus == PromotionStatus.Expired.GetEnumMemberValue();   
        }
    }
}
