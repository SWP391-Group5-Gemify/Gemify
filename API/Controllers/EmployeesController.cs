using API.Dtos;
using API.Helpers;
using AutoMapper;
using Core.Enitities.Identity;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Pagination<EmployeeDto>>> GetEmployees([FromQuery] EmployeeSpecParams employeeParams)
        {
            var spec = new EmployeeSpecification(employeeParams);

            var countSpec = new EmployeeWithFilterForCountSpecification(employeeParams);

            var employees = await _userRepository.ListUsersAsync(spec, employeeParams.Role);

            var totalEmployees = await _userRepository.CountAsync(countSpec, employeeParams.Role);

            var data = _mapper.Map<IReadOnlyList<User>, IReadOnlyList<EmployeeDto>>(employees);

            return Ok(new Pagination<EmployeeDto>(employeeParams.PageIndex, employeeParams.PageSize, totalEmployees, data));
        }
    }
}
