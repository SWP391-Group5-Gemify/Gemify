using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Core.Enitities
{
    public enum PromotionStatus
    {
        [EnumMember(Value = "Còn Hiệu Lực")]
        Active,

        [EnumMember(Value = "Hết Hạn")]
        Expired
    }
}
