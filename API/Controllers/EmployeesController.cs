using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Enitities.Identity;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Roles = "StoreOwner")]
    public class EmployeesController : BaseApiController
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public EmployeesController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "StoreOwner")]
        public async Task<ActionResult<Pagination<EmployeeDto>>> GetEmployees([FromQuery] EmployeeSpecParams employeeParams)
        {
            var spec = new EmployeeSpecification(employeeParams);

            var countSpec = new EmployeeWithFilterForCountSpecification(employeeParams);

            var employees = await _userService.ListUsersAsync(spec, employeeParams.Role);

            var totalEmployees = await _userService.CountAsync(countSpec, employeeParams.Role);

            var data = _mapper.Map<IReadOnlyList<User>, IReadOnlyList<EmployeeDto>>(employees);

            return Ok(new Pagination<EmployeeDto>(employeeParams.PageIndex, employeeParams.PageSize, totalEmployees, data));
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "StoreOwner")]
        public async Task<ActionResult<EmployeeDto>> EmployeeDetails(string id)
        {
            var spec = new EmployeeSpecification(id);

            var employee = await _userService.GetUserWithSpec(spec);

            if(employee==null) return NotFound(new ApiResponse(404));

            var data = _mapper.Map<User,EmployeeDto>(employee);

            return Ok(data);
        }

        [HttpDelete]
        [Authorize(Roles = "StoreOwner")]
        public async Task<ActionResult<EmployeeDto>> DeleteEmployee([FromQuery] string id)
        {
            var spec = new EmployeeSpecification(id);

            var exist_emp = await _userService.GetUserWithSpec(spec);

            if(exist_emp==null) return NotFound(new ApiResponse(404));

            exist_emp.Status = "Closed";

            var result = await _userService.UpdateUserAsync(exist_emp);

            if(result.Succeeded) return Ok("Close Account Succeeded");
            else return BadRequest(new ApiResponse(400));
        }

        [HttpPut]
        [Authorize(Roles = "StoreOwner")]
        public async Task<ActionResult<EmployeeDto>> UpdateEmployee(EmployeeDto employee)
        {
            var spec = new EmployeeSpecification(employee.Id);

            var exist_emp = await _userService.GetUserWithSpec(spec);

            if(exist_emp==null) return NotFound(new ApiResponse(404));

            _mapper.Map(employee,exist_emp);

            var result = await _userService.UpdateUserAsync(exist_emp);

            if(result.Succeeded) return Ok("Update Succeeded");
            else return BadRequest(new ApiResponse(400));
        }

        [HttpGet("roles")]
        [Authorize(Roles = "StoreOwner")]
        public async Task<ActionResult<IReadOnlyList<IdentityRole>>> GetAllRoles()
        {
            var roles = await _userService.GetAllRolesAsync();

            return Ok(_mapper.Map<IReadOnlyList<IdentityRole>, IReadOnlyList<RoleDto>>(roles));
        }
    }
}
