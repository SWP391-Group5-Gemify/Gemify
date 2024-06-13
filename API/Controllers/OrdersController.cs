using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Enitities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

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

        [HttpPost("buyBackOrder")]
        public async Task<ActionResult<Core.Enitities.OrderAggregate.Order>> CreateBuyBackOrder (OrderDto orderDto)
        {
            // get userId whose create order
            var user = await _userService.GetUserByClaimsEmailAsync(HttpContext.User);            
            var userId = user.Id;

            // create buy back order
            var buyBackOrder = await _orderService.CreateBuyBackOrderAsync(orderDto.basketId, orderDto.customerId, userId);
            var buyBackOrderDto = _mapper.Map<OrderToReturnDto>(buyBackOrder);

            if (buyBackOrderDto == null)
            {
                return BadRequest(new ApiResponse(400, "Problem creating order"));
            }
            return Ok(buyBackOrderDto);
        }
    }
}
