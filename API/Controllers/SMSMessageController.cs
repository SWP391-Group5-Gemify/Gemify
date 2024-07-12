using API.Dtos;
using API.Errors;
using API.Helpers;
using Core.Interfaces;
using Core.Specifications.Customers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SMSMessageController : BaseApiController
    {
        private readonly ISpeedSMSAPIService _speedSMSAPIService;

        public SMSMessageController(ISpeedSMSAPIService speedSMSAPIService) 
        {
            _speedSMSAPIService = speedSMSAPIService;
        }

        // Get all customers with specification
        [HttpPost]
        [Authorize(Roles = "Seller,Repurchaser")]
        public async Task<ActionResult<string>> SendSMS(SendSMSRequestDto sms)
        {
            String[] phones = new String[] { sms.PhoneNumber };
            var result = await _speedSMSAPIService.sendSMS(phones, sms.BasketCode, 2);
            return Ok(new ApiResponse(200, result));
        }
    }
}
