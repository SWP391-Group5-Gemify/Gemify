using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Enitities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IMapper _mapper;

        public BasketController(IBasketRepository basketRepository, IMapper mapper)
        {
            _basketRepository = basketRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "Cashier,Repurchaser,Seller")]
        public async Task<ActionResult<IReadOnlyList<CustomerBasket>>> GetAllBaskets()
        {
            var baskets = await _basketRepository.GetAllBasketsAsync();
            return Ok(baskets);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Cashier,Repurchaser,Seller")]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await _basketRepository.GetBasketAsync(id);

            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost("{id}")]
        [Authorize(Roles = "Cashier,Repurchaser,Seller")]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(string id, CustomerBasketDto basket)
        {            
            var customerBasket = await _basketRepository.GetBasketAsync(id);

            if(customerBasket!=null) 
            {               
                _mapper.Map(basket, customerBasket);

                var updatedBasket = await _basketRepository.UpdateBasketAsync(customerBasket);

                return Ok(updatedBasket);
            }
            else return NotFound(new ApiResponse(404, "Basket not found."));
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = "Cashier,Repurchaser,Seller")]
        public async Task<ActionResult> DeleteBasketAsync(string id)
        {
            return Ok(await _basketRepository.DeleteBasketAsync(id));
        }
    }
}
