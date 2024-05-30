using System.Runtime.Serialization;

namespace Core.Enitities
{
    public enum ProductStatus
    {
        [EnumMember(Value = "Old")]
        Old,

        [EnumMember(Value = "New")]
        New,

        [EnumMember(Value = "Unavailable")]
        Unavailable,

    }
}
