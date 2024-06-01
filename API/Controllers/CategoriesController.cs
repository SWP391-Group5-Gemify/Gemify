using API.Dtos;
using API.Helpers;
using AutoMapper;
using Core.Enitities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CategoriesController : BaseApiController
    {
        private readonly IGenericRepository<Category> _categoryRepo;
        private readonly IMapper _mapper;

        public CategoriesController(IGenericRepository<Category> categoryRepo, IMapper mapper)
        {
            _categoryRepo = categoryRepo;
            _mapper = mapper;
        }

        // Get all categories with specification
        [HttpGet]
        [Authorize(Roles = "StoreOwner,StoreManager,Seller,Cashier")]
        public async Task<ActionResult<IReadOnlyList<CategoryDto>>> GetCategories()
        {
            var spec = new CategorySpecification();
            var categories = await _categoryRepo.ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<Category>, IReadOnlyList<CategoryDto>>(categories);
            return Ok(data);
        }
    }
}
