using API.Dtos;
using API.Errors;
using Core.Enitities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public AccountController(UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager) 
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);

            if (user == null) return Unauthorized(new ApiResponse(401));

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

            var userRoles = await _userManager.GetRolesAsync(user);
            var userRole = userRoles.FirstOrDefault();    

            return new UserDto
            {
                Email = user.Email,
                Token = "Random token",
                UserName = user.UserName,
                FullName = user.FullName,
                Gender = user.Gender.ToString(),
                Status = user.Status.ToString(),
                Address = user.Address,
                DateOfBirth = user.DateOfBirth.ToString(),
                Image_Url = user.Image_Url,
                Role = userRole
            };
        }
    }
}
