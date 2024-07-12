using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Headers;

namespace Infrastructure.Services
{
    public class SpeedSMSAPIService : ISpeedSMSAPIService
    {
        public const int TYPE_QC = 1;
        public const int TYPE_CSKH = 2;
        public const int TYPE_BRANDNAME = 3;
        public const int TYPE_BRANDNAME_NOTIFY = 4;
        public const int TYPE_GATEWAY = 5;

        const string rootURL = "https://api.speedsms.vn/index.php";
        private readonly string _accessToken;
        private readonly string _sender;
        private readonly IConfiguration _config;

        public SpeedSMSAPIService(IConfiguration config)
        {
            _config = config;
            _accessToken = _config.GetSection("SpeedSMSSettings:AccessToken").Value;
            _sender = _config.GetSection("SpeedSMSSettings:DeviceId").Value;
        }

        public async Task<string> sendSMS(string[] phones, string content, int type)
        {
            string url = rootURL + "/sms/send";
            if (phones.Length <= 0)
                return "";
            if (content.Equals(""))
                return "";

            if (type == TYPE_BRANDNAME && _sender.Equals(""))
                return "";

            using (var client = new HttpClient())
            {
                // Setting the credentials
                var byteArray = Encoding.ASCII.GetBytes($"{_accessToken}:x");
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));

                // Setting the content type
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                // Building the JSON payload
                var payload = new
                {
                    to = phones,
                    content = Uri.EscapeDataString("Mã giỏ hàng của bạn là: " + content),
                    type = type,
                    sender = _sender
                };

                var json = Newtonsoft.Json.JsonConvert.SerializeObject(payload);
                var contentString = new StringContent(json, Encoding.UTF8, "application/json");

                // Sending the request
                var response = await client.PostAsync(url, contentString);
                response.EnsureSuccessStatusCode();

                return await response.Content.ReadAsStringAsync();
            }
        }
    }
}
