using API.Dtos;
using AutoMapper;
using Core.Enitities.Identity;
using Core.Interfaces;

namespace API.Helpers
{
    public class UserRoleResolver : IValueResolver<User, UserDto, string>
    {
        private readonly IUserService _userRepository;

        public UserRoleResolver(IUserService userRepository)
        {
            _userRepository = userRepository;
        }
        public string Resolve(User source, UserDto destination, string destMember, ResolutionContext context)
        {
            var userRole = _userRepository.GetUserRoleAsync(source).Result;
            return userRole;
        }
    }
}
