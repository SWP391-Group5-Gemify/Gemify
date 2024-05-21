using API.Dtos;
using API.Errors;
using Core.Enitities;
using Core.Enitities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager, ITokenService tokenService) 
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
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
                Token = _tokenService.CreateToken(user, userRole),
                UserName = user.UserName,
                FullName = user.FullName,
                Gender = user.Gender.ToString(),
                Status = user.Status.ToString(),
                Address = user.Address,
                DateOfBirth = user.DateOfBirth,
                Image_Url = user.Image_Url,
                Role = userRole
            };
        }

        [HttpPost("register")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var user = new AppUser
            {
                Email = registerDto.Email,
                UserName = registerDto.UserName,
                FullName = registerDto.FullName,
                Gender = (Gender)Enum.Parse(typeof(Gender), registerDto.Gender),
                Status = (UserStatus)Enum.Parse(typeof(UserStatus), registerDto.Status),
                Address = registerDto.Address,
                DateOfBirth = registerDto.DateOfBirth,
                Image_Url = registerDto.Image_Url,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            var roleResult = await _userManager.AddToRoleAsync(user, registerDto.Role);

            if (!result.Succeeded && !roleResult.Succeeded) return BadRequest(new ApiResponse(400));

            return new UserDto()
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user, registerDto.Role),
                UserName = user.UserName,
                FullName = user.FullName,
                Gender = user.Gender.ToString(),
                Status = user.Status.ToString(),
                Address = user.Address,
                DateOfBirth = user.DateOfBirth,
                Image_Url = user.Image_Url,
                Role = registerDto.Role
            };
        }
    }
}
