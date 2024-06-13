using API.Errors;
using API.Dtos;
using AutoMapper;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications.Orders;
using Microsoft.AspNetCore.Mvc;
using API.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Order>> GetOrderById(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if(order == null) return NotFound(new ApiResponse(404,"Order not found!"));
            return Ok(_mapper.Map<Order,OrderDto>(order));
        }

        [HttpGet("orderitem/{id}")]
        public async Task<ActionResult<OrderItem>> GetOrderItemById(int id) {
            var order = await _orderService.GetOrderItemByIdAsync(id);
            return Ok(order);
        }

        [HttpGet]
        [Authorize(Roles = "StoreOwner,StoreManager,Repurchaser,Cashier")]
        public async Task<ActionResult<IReadOnlyList<Order>>> GetOrders([FromQuery] OrderSpecParams orderSpecParams)
        {
            var spec = new OrdersSpecification(orderSpecParams);
            var countSpec = new OrderWithFilerForCountSpecification(orderSpecParams);
            var orders = await _orderService.GetOrdersAsync(spec);
            var totalOrders = await _orderService.CountOrdersWithSpecAsync(countSpec);
            var data = _mapper.Map<IReadOnlyList<Order>,IReadOnlyList<OrderDto>>(orders);
            return Ok(new Pagination<OrderDto>
                (orderSpecParams.PageIndex,orderSpecParams.PageSize,totalOrders,data));
        }

        
    }
}
