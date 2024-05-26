using API.Dtos;
using AutoMapper;
using Core.Enitities.Identity;
using Core.Interfaces;

namespace API.Helpers
{
    public class RoleResolver : IValueResolver<User, UserDto, string>
    {
        private readonly IUserRepository _userRepository;

        public RoleResolver(IUserRepository userRepository)
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
