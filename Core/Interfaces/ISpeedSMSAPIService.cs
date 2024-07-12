using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ISpeedSMSAPIService
    {
        Task<string> sendSMS(string[] phones, string content, int type);
    }
}
