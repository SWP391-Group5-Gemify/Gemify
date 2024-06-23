using API.Errors;
using API.Dtos;
using AutoMapper;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications.Orders;
using Microsoft.AspNetCore.Mvc;
using API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Core.Enitities;
using System.Security.Claims;
using Infrastructure.Services;
using Core.Specifications.Customers;
using Core.Enitities.Identity;

namespace API.Controllers
{
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public OrdersController(IOrderService orderService, IMapper mapper, IUserService userService)
        {
            _orderService = orderService;
            _mapper = mapper;
            _userService = userService;
        }

        [HttpPost("sales")]
        [Authorize(Roles = "Cashier")]
        public async Task<ActionResult<OrderToReturnDto>> CreateSalesOrder(OrderDto orderDto)
        {
            var user = await _userService.GetUserByClaimsEmailAsync(HttpContext.User);
            if (user == null) return BadRequest(new ApiResponse(400, "Error while creating order"));
            var userId = user.Id;

            var order = await _orderService.CreateSalesOrderAsync(orderDto.BasketId, orderDto.CustomerId, userId);

            if(order == null)
            {
                return BadRequest(new ApiResponse(400, "Error while creating order"));
            }

            return Ok(_mapper.Map<Order, OrderToReturnDto>(order));
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "StoreOwner,StoreManager,Repurchaser,Seller,Cashier")]
        public async Task<ActionResult<Order>> GetOrderById(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if(order == null) return NotFound(new ApiResponse(404,"Order not found!"));
            return Ok(_mapper.Map<Order, OrderToReturnDto>(order));
        }

        [HttpGet]
        [Authorize(Roles = "StoreOwner,StoreManager,Repurchaser,Seller,Cashier")]
        public async Task<ActionResult<IReadOnlyList<Order>>> GetOrders([FromQuery] OrderSpecParams orderSpecParams)
        {
            var spec = new OrdersSpecification(orderSpecParams);
            var countSpec = new OrderWithFilterForCountSpecification(orderSpecParams);
            var orders = await _orderService.GetOrdersAsync(spec);
            var totalOrders = await _orderService.CountOrdersWithSpecAsync(countSpec);
            var data = _mapper.Map<IReadOnlyList<Order>,IReadOnlyList<OrderToReturnDto>>(orders);
            return Ok(new Pagination<OrderToReturnDto>
                (orderSpecParams.PageIndex,orderSpecParams.PageSize,totalOrders,data));
        }

        [Authorize(Roles = "Cashier")]
        [HttpPost("buyback")]
        public async Task<ActionResult<OrderToReturnDto>> CreateBuyBackOrder(OrderDto orderDto)
        {
            // get userId whose create order

            var user = await _userService.GetUserByClaimsEmailAsync(HttpContext.User);
            var userId = user.Id;

            // create buy back order
            var buyBackOrder = await _orderService.CreateBuyBackOrderAsync(orderDto.BasketId, orderDto.CustomerId, userId);

            if (buyBackOrder == null)
            {
                return BadRequest(new ApiResponse(400, "Problem creating buyback order"));
            }

            return Ok(_mapper.Map<Order, OrderToReturnDto>(buyBackOrder));
        }

        [Authorize(Roles = "Cashier")]
        [HttpPost("exchange")]
        public async Task<ActionResult<OrderToReturnDto>> CreateExchangeOrder(OrderDto orderDto)
        {
            // get userId whose create order
            var user = await _userService.GetUserByClaimsEmailAsync(HttpContext.User);
            var userId = user.Id;

            // create buy back order
            var exchangeOrder = await _orderService.CreateExchangeOrderAsync(orderDto.BasketId, orderDto.CustomerId, userId);

            if (exchangeOrder == null)
            {
                return BadRequest(new ApiResponse(400, "Problem creating exchange order"));
            }

            return Ok(_mapper.Map<Order, OrderToReturnDto>(exchangeOrder));
        }


        [HttpGet("types")]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<OrderType>>> GetAllOrderTypes()
        {
            var orderTypes = await _orderService.GetOrderTypesAsync();
            return Ok(orderTypes);
        }

        [Authorize(Roles = "Cashier")]
        [HttpPut("update/{id}")]
        public async Task<ActionResult<Order>> UpdateOrder(int id,[FromQuery] string status)
        {
            var existingOrder = await _orderService.GetOrderByIdAsync(id);
            if (existingOrder == null)
                return NotFound(new ApiResponse(404, "This order does not exist"));

            existingOrder.Status = status;
            var result = await _orderService.UpdateOrderAsync(existingOrder);

            if (result > 0)
                return Ok(new ApiResponse(200, "Successfully updated!"));
                
            return BadRequest(new ApiResponse(400, "Failed to update!"));
        }
    }
}
