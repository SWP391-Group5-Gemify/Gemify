using System.Runtime.Serialization;

namespace Core.Enitities
{
    public enum ProductStatus
    {
        [EnumMember(Value = "Còn Hàng")]
        Available,

        [EnumMember(Value = "Không Bán")]
        Unavailable,
    }
}
