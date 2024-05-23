
using System.Runtime.Serialization;

namespace Core.Enitities
{
    public enum GoldUnit
    {
        [EnumMember(Value = "Li")]
        Li,

        [EnumMember(Value = "Candareen")]
        Candareen,

        [EnumMember(Value = "Mace")]
        Mace,

        [EnumMember(Value = "Tael")]
        Tael,
    }
}
