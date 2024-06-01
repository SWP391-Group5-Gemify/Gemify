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
        private readonly IUserService _userRepo;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;

        public AccountController(IUserService userRepo, 
            SignInManager<User> signInManager, ITokenService tokenService) 
        {
            _userRepo = userRepo;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userRepo.GetUserByClaimsEmailAsync(HttpContext.User);

            var userRole = await _userRepo.GetUserRoleAsync(user);

            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user, userRole),
                UserName = user.UserName,
                FullName = user.FullName,
                Gender = user.Gender,
                PhoneNumber = user.PhoneNumber,
                Status = user.Status,
                Address = user.Address,
                DateOfBirth = user.DateOfBirth,
                Image_Url = user.Image_Url,
                Role = userRole
            };
        }

        [HttpGet("email_exists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userRepo.GetUserByEmailAsync(email) != null;
        }

        [HttpGet("username_exists")]
        public async Task<ActionResult<bool>> CheckUserNameExistsAsync([FromQuery] string userName)
        {
            return await _userRepo.GetUserByUserNameAsync(userName) != null;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userRepo.GetUserByUserNameAsync(loginDto.UserName);

            if (user == null) return Unauthorized(new ApiResponse(401));

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

            var userRole = await _userRepo.GetUserRoleAsync(user);

            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user, userRole),
                UserName = user.UserName,
                FullName = user.FullName,
                Gender = user.Gender,
                PhoneNumber = user.PhoneNumber,
                Status = user.Status,
                Address = user.Address,
                DateOfBirth = user.DateOfBirth,
                Image_Url = user.Image_Url,
                Role = userRole
            };
        }

        [HttpPost("register")]
        [Authorize(Roles = "StoreOwner")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var user = new User
            {
                Email = registerDto.Email,
                UserName = registerDto.UserName,
                FullName = registerDto.FullName,
                Gender = registerDto.Gender,
                PhoneNumber = registerDto.PhoneNumber,
                Status = registerDto.Status,
                Address = registerDto.Address,
                DateOfBirth = registerDto.DateOfBirth,
                Image_Url = registerDto.Image_Url,
            };

            var result = await _userRepo.CreateUserAsync(user, registerDto.Password);
            var roleResult = await _userRepo.AddUserToRoleAsync(user, registerDto.Role);

            if (!result.Succeeded && !roleResult.Succeeded) return BadRequest(new ApiResponse(400));

            return new UserDto()
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user, registerDto.Role),
                UserName = user.UserName,
                FullName = user.FullName,
                Gender = user.Gender,
                PhoneNumber = user.PhoneNumber,
                Status = user.Status,
                Address = user.Address,
                DateOfBirth = user.DateOfBirth,
                Image_Url = user.Image_Url,
                Role = registerDto.Role
            };
        }
    }
}
