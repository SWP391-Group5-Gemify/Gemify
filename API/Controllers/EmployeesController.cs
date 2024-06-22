using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Enitities.Identity;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Employees;
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

        // Get Employees with filter and paging
        [HttpGet]
        [Authorize(Roles = "StoreOwner")]
        public async Task<ActionResult<Pagination<EmployeeDto>>> GetEmployees([FromQuery] EmployeeSpecParams employeeParams)
        {
            var spec = new EmployeeSpecification(employeeParams);

            var countSpec = new EmployeeWithFilterForCountSpecification(employeeParams);

            var employees = await _userService.ListUsersAsync(spec, employeeParams.RoleId);

            var totalEmployees = await _userService.CountAsync(countSpec, employeeParams.RoleId);

            var data = _mapper.Map<IReadOnlyList<User>, IReadOnlyList<EmployeeDto>>(employees);

            return Ok(new Pagination<EmployeeDto>(employeeParams.PageIndex, employeeParams.PageSize, totalEmployees, data));
        }

        //Get Employee By Id
        [HttpGet("{id}")]
        [Authorize(Roles = "StoreOwner")]
        public async Task<ActionResult<EmployeeDto>> EmployeeDetails(int id)
        {
            var spec = new EmployeeSpecification(id);

            var employee = await _userService.GetUserWithSpec(spec);

            if(employee==null) return NotFound(new ApiResponse(404));

            var data = _mapper.Map<User,EmployeeDto>(employee);

            return Ok(data);
        }

        // Disable Employee Account
        [HttpDelete]
        [Authorize(Roles = "StoreOwner")]
        public async Task<ActionResult<EmployeeDto>> DeleteEmployee([FromQuery] int id)
        {
            var spec = new EmployeeSpecification(id);

            var exist_emp = await _userService.GetUserWithSpec(spec);

            if(exist_emp==null) return NotFound(new ApiResponse(404));

            exist_emp.Status = "Closed";

            var result = await _userService.UpdateUserAsync(exist_emp);

            if(result.Succeeded) return Ok(new ApiResponse(200, "Close Account Succeeded"));
            else return BadRequest(new ApiResponse(400, "Failed to close employee account"));
        }

        // Update Employee Information
        [HttpPut]
        [Authorize(Roles = "StoreOwner")]
        public async Task<ActionResult<EmployeeDto>> UpdateEmployee(EmployeeDto employee)
        {
            var spec = new EmployeeSpecification(employee.Id);

            var exist_emp = await _userService.GetUserWithSpec(spec);

            if(exist_emp==null) return NotFound(new ApiResponse(404));

            _mapper.Map(employee,exist_emp);

            var result = await _userService.UpdateUserAsync(exist_emp);

            if(result.Succeeded) return Ok(new ApiResponse(200, "Update Succeeded"));
            else return BadRequest(new ApiResponse(400, "Failed to update employee"));
        }

        // Get All Roles
        [HttpGet("roles")]
        [Authorize(Roles = "StoreOwner")]
        public async Task<ActionResult<IReadOnlyList<IdentityRole<int>>>> GetAllRoles()
        {
            var roles = await _userService.GetAllRolesAsync();

            return Ok(_mapper.Map<IReadOnlyList<IdentityRole<int>>, IReadOnlyList<RoleDto>>(roles));
        }
    }
}
