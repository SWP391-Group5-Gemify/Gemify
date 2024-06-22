using System.Runtime.Serialization;

namespace Core.Enitities
{
    public enum Role
    {
        [EnumMember(Value = "StoreOwner")]
        StoreOwner,

        [EnumMember(Value = "StoreManager")]
        StoreManager,

        [EnumMember(Value = "Appraiser")]
        Appraiser,

        [EnumMember(Value = "Cashier")]
        Cashier,

        [EnumMember(Value = "Seller")]
        Seller,

        [EnumMember(Value = "Repurchaser")]
        Repurchaser
    }
}
