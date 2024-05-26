using API.Dtos;
using API.Helpers;
using AutoMapper;
using Core.Enitities.Identity;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EmployeesController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public EmployeesController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<UserDto>>> GetEmployees([FromQuery] EmployeeSpecParams employeeParams)
        {
            var spec = new EmployeeSpecification(employeeParams, _userRepository);

            var countSpec = new EmployeeWithFilterCountSpecification(employeeParams, _userRepository);

            var totalEmployees = await _userRepository.CountAsync(countSpec);

            var employees = await _userRepository.ListUsersAsync(spec);

            var data = _mapper.Map<IReadOnlyList<User>, IReadOnlyList<UserDto>>(employees);

            return Ok(new Pagination<UserDto>(employeeParams.PageIndex, employeeParams.PageSize, totalEmployees, data));
        }
    }
}
