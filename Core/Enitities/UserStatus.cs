using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Core.Enitities
{
    public enum UserStatus
    {
        [EnumMember(Value = "Active")]
        Active,

        [EnumMember(Value = "Closed")]
        Closed
    }
}
