using API.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace API.Errors
{
    [Route("errors/{code}")]
    public class ErrorController : BaseApiController
    {
        public IActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}
