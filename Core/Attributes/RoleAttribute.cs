using Core.Enitities;
using System.ComponentModel.DataAnnotations;

namespace Core.Attributes
{
    [AttributeUsage(AttributeTargets.Property |
        AttributeTargets.Field, AllowMultiple = false)]
    public class RoleAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value == null) return false;
            var role = value.ToString();
            return role == Role.StoreOwner.ToString()
                || role == Role.Appraiser.ToString()
                || role == Role.Cashier.ToString()
                || role == Role.StoreManager.ToString()
                || role == Role.Repurchaser.ToString()
                || role == Role.Seller.ToString();
        }
    }
}
