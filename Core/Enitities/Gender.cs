using System.Runtime.Serialization;

namespace Core.Enitities
{
    public enum Gender
    {
        [EnumMember(Value = "Male")]
        Male,

        [EnumMember(Value = "Female")]
        Female
    }
}
