using API.Dtos;
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
        [Authorize(Roles = "StoreOwner,StoreManager,Seller,Cashier")]
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
        [Authorize(Roles = "StoreOwner,StoreManager,Seller,Cashier")]
        public async Task<ActionResult<CustomerDto>> GetCustomer (int id)
        {
            var spec = new CustomerSpecification(id);
            var customer = await _customerRepo.GetEntityWithSpec(spec);
            if (customer == null) { return NotFound(new ApiResponse(404, "This customer does not exist")); }
            return _mapper.Map<Customer, CustomerDto>(customer);
        }

        // Update customer information
        [HttpPut]
        [Authorize(Roles = "StoreOwner,StoreManager,Seller,Cashier")]
        public async Task<ActionResult> UpdateCustomer (CustomerDto customerDto)
        {
            var spec = new CustomerSpecification(customerDto.Id);
            var existingCustomer = await _customerRepo.GetEntityWithSpec(spec);
            if (existingCustomer == null)
                return NotFound(new ApiResponse(404, "This customer does not exist"));

            _mapper.Map(customerDto,existingCustomer);
            _customerRepo.Update(existingCustomer);
            if (await _customerRepo.SaveAllAsync())
                return Ok("Successfully updated!");
            return BadRequest("Fail to update customer information!");
        }


    }
}
