using System.Runtime.Serialization;

namespace Core.Enitities.OrderAggregate
{
    public enum OrderStatus
    {
        [EnumMember(Value = "Đang Xử Lý")]
        Pending,

        [EnumMember(Value = "Thanh Toán Thành Công")]
        PaymentReceived,

        [EnumMember(Value = "Thanh Toán Thất Bại")]
        PaymentFailed
    }
}
