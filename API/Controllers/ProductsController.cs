using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Enitities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ProductsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IProductService _productService;

        public ProductsController(IProductService productService, IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }
        
        // Get all products with specification
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductDto>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var spec = new ProductSpecification(productParams);
            var countSpec = new ProductCountSpecification(productParams);
            var totalProducts = await _productService.CountProductsAsync(countSpec);
            var products = await _productService.GetProductsAsync(spec);
            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductDto>>(products);
            return Ok(new Pagination<ProductDto>(productParams.PageIndex, productParams.PageSize, totalProducts, data));
        }

        // Get product by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null) { return NotFound(new ApiResponse(404, "This product does not exist")); }
            return _mapper.Map<Product, ProductDto>(product);
        }

       // [HttpGet("{id}/gems")]
       // public async Task<ActionResult<IReadOnlyList<ProductGem>>> GetProductGems(int id)
       // {

       // }

       // Update product information
       //[HttpPut]
       // public async Task<ActionResult> UpdateProduct(ProductDto productDto)
       // {
       //     var spec = new CustomerSpecification(productDto.Id);
       //     var existingCustomer = await _productRepo.GetEntityWithSpec(spec);
       //     if (existingCustomer == null)
       //         return NotFound(new ApiResponse(404, "This customer does not exist"));

       //     _mapper.Map(productDto, existingCustomer);
       //     _productRepo.Update(existingCustomer);
       //     if (await _productRepo.SaveAllAsync())
       //         return Ok("Successfully updated!");
       //     return BadRequest("Fail to update customer information!");
       // }


    }
}
