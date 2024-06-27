using System.Runtime.Serialization;

namespace Core.Enitities
{
    public enum Gender
    {
        [EnumMember(Value = "Nam")]
        Male,

        [EnumMember(Value = "Nữ")]
        Female
    }
}
