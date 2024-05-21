using API.Errors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TestErrorsController : BaseApiController
    {
        public TestErrorsController() { }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            return NotFound(new ApiResponse(404));
        }

        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            object test = null;

            //Referencing a null pointer
            var res = test.ToString();

            return Ok();
        }

        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetValidationError(int id)
        {
            //Try passing a string into it
            return Ok(id);
        }

        [HttpGet("auth")]
        [Authorize]
        public ActionResult<string> GetSecret()
        {
            return "you are authorized";
        }

        [HttpGet("authrole_admin")]
        [Authorize(Roles = "Admin")]
        public ActionResult<string> GetRoleAdmin()
        {
            return "your role is Admin";
        }

        [HttpGet("authrole_manager")]
        [Authorize(Roles = "Manager")]
        public ActionResult<string> GetRoleManager()
        {
            return "your role is Manager";
        }
    }
}
