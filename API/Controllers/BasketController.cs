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

        [HttpPost]
        [Authorize(Roles = "Cashier,Repurchaser,Seller")]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basket)
        {            
            var customerBasket =  _mapper.Map<CustomerBasketDto, CustomerBasket>(basket);

            var updatedBasket = await _basketRepository.UpdateBasketAsync(customerBasket);

            return Ok(updatedBasket);
        }

        [HttpDelete]
        [Authorize(Roles = "Cashier,Repurchaser,Seller")]
        public async Task<ActionResult> DeleteBasketAsync(string id)
        {
            return Ok(await _basketRepository.DeleteBasketAsync(id));
        }
    }
}
