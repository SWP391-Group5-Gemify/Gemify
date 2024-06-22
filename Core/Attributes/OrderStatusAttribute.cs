using Core.Enitities.OrderAggregate;
using System.ComponentModel.DataAnnotations;

namespace Core.Attributes
{
    [AttributeUsage(AttributeTargets.Property |
        AttributeTargets.Field, AllowMultiple = false)]
    public class OrderStatusAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value == null) return false;
            var status = value.ToString();
            return status == OrderStatus.Pending.ToString()
                || status == OrderStatus.PaymentReceived.ToString()
                || status == OrderStatus.PaymentFailed.ToString();
        }
    }
}
