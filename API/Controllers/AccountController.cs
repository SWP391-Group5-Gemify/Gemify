using API.Dtos;
using API.Errors;
using Core.Enitities;
using Core.Enitities.Identity;
using Core.Interfaces;
using Core.Models;
using Infrastructure.Services.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IUserService _userService;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;

        public AccountController(IUserService userRepo,
            SignInManager<User> signInManager, 
            ITokenService tokenService,
            IEmailService emailService,
            IConfiguration configuration)
        {
            _userService = userRepo;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _emailService = emailService;
            _configuration = configuration;
        }

        // Get the currently logged in user
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userService.GetUserByClaimsEmailAsync(HttpContext.User);

            if (user == null) return Unauthorized(new ApiResponse(401));

            var userRole = await _userService.GetUserRoleAsync(user);

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

        // Check if the Email existed
        [HttpGet("email_exists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userService.GetUserByEmailAsync(email) != null;
        }

        // Check if the Username existed
        [HttpGet("username_exists")]
        public async Task<ActionResult<bool>> CheckUserNameExistsAsync([FromQuery] string userName)
        {
            return await _userService.GetUserByUserNameAsync(userName) != null;
        }

        // Login and return User object
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userService.GetUserByUserNameAsync(loginDto.UserName);

            if (user == null) return Unauthorized(new ApiResponse(401, "Người dùng không tồn tại!"));

            // If account is closed then return unauthorized response
            if (user.Status.Equals(UserStatus.Closed.GetEnumMemberValue())) return Unauthorized(new ApiResponse(401, "Tài khoản đã đóng!"));

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized(new ApiResponse(401, "Mật khẩu hoặc tên người dùng không đúng!"));

            var userRole = await _userService.GetUserRoleAsync(user);

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

        // Register and return User object
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

            var result = await _userService.CreateUserAsync(user, registerDto.Password);
            var roleResult = await _userService.AddUserToRoleAsync(user, registerDto.Role);

            if (!result.Succeeded && !roleResult.Succeeded) return BadRequest(new ApiResponse(400, "Đăng ký tài khoản thất bại!"));

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

        [HttpPost("forgot-password")]
        [AllowAnonymous]
        public async Task<ActionResult> ForgotPassword([Required] string email)
        {
            var token = await _userService.GenerateResetPasswordTokenAsync(email);
            if (token == null) return BadRequest(new ApiResponse(400, "Error Creating Token"));
            var encodedToken = HttpUtility.UrlEncode(token);
            var encodedEmail = HttpUtility.UrlEncode(email);
            var baseUrl = _configuration["BaseUrl"]; // Replace with your actual base URL
            var action = "reset-password";

            var forgotPasswordLink = $"{baseUrl}/{action}?token={encodedToken}&email={encodedEmail}";
            
            var message = new Message(new string[] { email }, "[GEMIFY] YÊU CẦU ĐỔI MẬT KHẨU", "Theo đường dẫn để thay mật khẩu mới: " + forgotPasswordLink);

            await _emailService.SendEmail(message);
            return Ok(new ApiResponse(200, "Yêu cầu đổi mật khẩu đã được gửi về email của bạn!"));
        }

        [HttpPost("reset-password")]
        [AllowAnonymous]
        public async Task<ActionResult> ResetPassword(ResetPassword resetPassword)
        {
            var result = await _userService.ResetPasswordAsync(resetPassword);
            if (result == null) return BadRequest(new ApiResponse(400, "Thay đổi mật khẩu thất bại!"));
            return Ok(new ApiResponse(200, "Thay đổi mật khẩu thành công!"));
        }
    }
}
