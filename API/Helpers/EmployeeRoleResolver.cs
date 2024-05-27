using API.Dtos;
using AutoMapper;
using Core.Enitities.Identity;
using Core.Interfaces;

namespace API.Helpers
{
    public class EmployeeRoleResolver : IValueResolver<User, EmployeeDto, string>
    {
        private readonly IUserRepository _userRepository;

        public EmployeeRoleResolver(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public string Resolve(User source, EmployeeDto destination, string destMember, ResolutionContext context)
        {
            var empRole = _userRepository.GetUserRoleAsync(source).Result;
            return empRole;
        }
    }
}
