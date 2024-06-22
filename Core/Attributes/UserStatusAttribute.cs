using Core.Enitities;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace Core.Attributes
{
    [AttributeUsage(AttributeTargets.Property |
        AttributeTargets.Field, AllowMultiple = false)]
    public class UserStatusAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value == null) return false;
            var status = value.ToString();
            return status == UserStatus.Active.ToString()
                || status == UserStatus.Closed.ToString();
        }
    }
}
