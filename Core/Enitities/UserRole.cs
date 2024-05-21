using System.Runtime.Serialization;

namespace Core.Enitities
{
    public enum UserRole
    {
        [EnumMember(Value = "Admin")]
        Admin,

        [EnumMember(Value = "Manager")]
        Manager,

        [EnumMember(Value = "Cashier")]
        Cashier,

        [EnumMember(Value = "Sales")]
        Sales,

        [EnumMember(Value = "Repurchaser")]
        Repurchaser,

        [EnumMember(Value = "Appraiser")]
        Appraiser
    }
}
