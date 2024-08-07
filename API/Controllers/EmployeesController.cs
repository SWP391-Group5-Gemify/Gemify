﻿using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Enitities;
using Core.Enitities.Identity;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Employees;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Roles = "StoreOwner,StoreManager")]
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
        [Authorize(Roles = "StoreOwner,StoreManager")]
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
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<EmployeeDto>> EmployeeDetails(int id)
        {
            var spec = new EmployeeSpecification(id);

            var employee = await _userService.GetUserWithSpec(spec);

            if(employee==null) return NotFound(new ApiResponse(404));

            var data = _mapper.Map<User,EmployeeDto>(employee);

            return Ok(data);
        }

        // Disable Employee Account
        [HttpDelete("{id}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<EmployeeDto>> DeleteEmployee(int id)
        {
            var spec = new EmployeeSpecification(id);

            var exist_emp = await _userService.GetUserWithSpec(spec);

            if(exist_emp==null) return BadRequest(new ApiResponse(400, "Đóng tài khoản thất bại!"));

            exist_emp.Status = UserStatus.Closed.GetEnumMemberValue();

            var result = await _userService.UpdateUserAsync(exist_emp);

            if(result.Succeeded) return Ok(new ApiResponse(200, "Đóng tài khoản thành công!"));
            else return BadRequest(new ApiResponse(400, "Đóng tài khoản thất bại!"));
        }

        // Update Employee Information
        [HttpPut("{id}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<EmployeeDto>> UpdateEmployee(int id, EmployeeDto employee)
        {
            var spec = new EmployeeSpecification(id);

            var exist_emp = await _userService.GetUserWithSpec(spec);

            if(exist_emp==null) return NotFound(new ApiResponse(404, "Nhân viên không có trong hệ thống!"));

            _mapper.Map(employee,exist_emp);

            var result = await _userService.UpdateUserAsync(exist_emp);

            if(result.Succeeded) return Ok(new ApiResponse(200, "Cập nhật thông tin nhân viên thành công!"));
            else return BadRequest(new ApiResponse(400, "Lỗi cập nhật thông tin nhân viên!"));
        }

        // Get All Roles
        [HttpGet("roles")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<IReadOnlyList<IdentityRole<int>>>> GetAllRoles()
        {
            var roles = await _userService.GetAllRolesAsync();

            return Ok(_mapper.Map<IReadOnlyList<IdentityRole<int>>, IReadOnlyList<RoleDto>>(roles));
        }

        [HttpGet("seller")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult<IReadOnlyList<EmployeeDto>>> GetAllSellers()
        {
            var employees = await _userService.GetUsersInRoleAsync("Seller");
            return Ok(_mapper.Map<IReadOnlyList<User>, IReadOnlyList<EmployeeDto>>((IReadOnlyList<User>)employees));
        }
    }
}
