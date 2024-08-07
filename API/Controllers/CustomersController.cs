﻿using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Enitities;
using Core.Interfaces;
using Core.Specifications.Customers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class CustomersController : BaseApiController
    {
        private readonly IGenericRepository<Customer> _customerRepo;
        private readonly IMapper _mapper;

        public CustomersController(IGenericRepository<Customer> customerRepo, IMapper mapper)
        {
            _customerRepo = customerRepo;
            _mapper = mapper;
        }

        // Get all customers with specification
        [HttpGet]
        [Authorize(Roles = "StoreOwner,StoreManager,Seller,Cashier,Repurchaser")]
        public async Task<ActionResult<Pagination<CustomerDto>>> GetCustomers([FromQuery] CustomerParams customerParams)
        {
            var spec = new CustomerSpecification(customerParams);
            var countSpec = new CustomerCountSpecification(customerParams);
            var totalCustomers = await _customerRepo.CountAsync(countSpec);
            var customers = await _customerRepo.ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<Customer>,IReadOnlyList<CustomerDto>>(customers);
            return Ok(new Pagination<CustomerDto>(customerParams.PageIndex, customerParams.PageSize, totalCustomers, data));
        }

        // Get customer by ID
        [HttpGet("{id}")]
        [Authorize(Roles = "StoreOwner,StoreManager,Seller,Cashier,Repurchaser")]
        public async Task<ActionResult<CustomerDto>> GetCustomer (int id)
        {
            var spec = new CustomerSpecification(id);
            var customer = await _customerRepo.GetEntityWithSpec(spec);
            if (customer == null) { return NotFound(new ApiResponse(404, "Khách hàng không có trong hệ thống!")); }
            return _mapper.Map<Customer, CustomerDto>(customer);
        }

        // Update customer information
        [HttpPut("{id}")]
        [Authorize(Roles = "StoreOwner,StoreManager,Cashier")]
        public async Task<ActionResult<CustomerDto>> UpdateCustomer (int id, CustomerDto customerDto)
        {
            var spec = new CustomerSpecification(id);
            var existingCustomer = await _customerRepo.GetEntityWithSpec(spec);
            if (existingCustomer == null)
                return NotFound(new ApiResponse(404, "Khách hàng không có trong hệ thống!"));

            _mapper.Map(customerDto,existingCustomer);
            _customerRepo.Update(existingCustomer);
            if (await _customerRepo.SaveAllAsync())
            {
                return Ok(_mapper.Map<Customer, CustomerDto>(existingCustomer));
            }
                
            return BadRequest(new ApiResponse(400, "Lỗi cập nhật thông tin khách hàng!"));
        }

        // add new customer
        [HttpPost]
        [Authorize(Roles = "StoreOwner,StoreManager,Cashier")]
        public async Task<ActionResult<CustomerDto>> CreateCustomer(CustomerToAddDto customerDto)
        {
            var customer = _mapper.Map<Customer>(customerDto);
            _customerRepo.Add(customer);
            if (await _customerRepo.SaveAllAsync())
            {
                var spec = new CustomerSpecification(customer.Id);
                var customerToReturn = await _customerRepo.GetEntityWithSpec(spec);
                return _mapper.Map<Customer, CustomerDto>(customerToReturn);
            }
            return BadRequest(new ApiResponse(400, "Lỗi tạo mới thông tin khách hàng!"));
        }

        //  check exist phone
        [HttpGet("phone/{phone}")]
        [Authorize(Roles = "StoreOwner,StoreManager,Cashier,Seller,Repurchaser")]
        public async Task<ActionResult<CustomerDto>> GetCustomerByPhone(string phone)
        {
            var spec = new CustomerSpecification(phone);
            var customer = await _customerRepo.GetEntityWithSpec(spec);
            if (customer == null) return null;
            return Ok(_mapper.Map<CustomerDto>(customer));
        }
    }
}
