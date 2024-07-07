using System.Runtime.Serialization;

namespace Core.Enitities
{
    public enum ProductStatus
    {
        [EnumMember(Value = "Available")]
        Available,

        [EnumMember(Value = "Unavailable")]
        Unavailable,

        [EnumMember(Value ="Old")]
        Old,
    }
}
