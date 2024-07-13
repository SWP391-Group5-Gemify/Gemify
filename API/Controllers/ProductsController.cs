using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Enitities;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Products;
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
        [Authorize(Roles = "StoreOwner,StoreManager,Seller,Repurchaser,Cashier")]
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
        [Authorize(Roles = "StoreOwner,StoreManager,Seller,Repurchaser,Cashier")]
        public async Task<ActionResult<ProductDto>> GetNewProduct(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null) { return NotFound(new ApiResponse(404, "This product does not exist!")); }
            return _mapper.Map<Product, ProductDto>(product);
        }

        // Add a new product
        [HttpPost]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult> AddProduct (ProductToAddDto productDto)
        {
            var product = _mapper.Map<ProductToAddDto,Product>(productDto);
            if (await _productService.AddProductAsync(product))
                return Ok(new ApiResponse(200, "Successfully added a new product"));
            return BadRequest(new ApiResponse(400, "Fail to add a new product!"));          
        }

        //Update product information
        [HttpPut("{id}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult> UpdateProduct(int id, ProductToAddDto productDto)
        {
            var existingProduct = await _productService.GetProductByIdAsync(id);
            if (existingProduct == null)
                return NotFound(new ApiResponse(404, "This product does not exist!"));

            _mapper.Map(productDto, existingProduct);

            //return existingProduct;
            if (await _productService.UpdateProductAsync(existingProduct))
                return Ok(new ApiResponse(200, "Product was successfully updated"));

            return BadRequest(new ApiResponse(400, "Fail to update product information!"));
        }

        // Delete Product
        [HttpDelete("{id}")]
        [Authorize(Roles = "StoreOwner,StoreManager")]
        public async Task<ActionResult> DeleteProduct (int id)
        {
            var existingProduct = await _productService.GetProductByIdAsync(id);
            if (existingProduct == null)
                return NotFound(new ApiResponse(404, "This product does not exist!"));

            existingProduct.Status = ProductStatus.Unavailable.GetEnumMemberValue();

            if (await _productService.UpdateProductAsync(existingProduct))
                return Ok(new ApiResponse(200, "Product was successfully deleted"));

            return BadRequest(new ApiResponse(400, "Fail to delete product information!"));
        }

        // Get all categories with specification
        [HttpGet("categories")]
        [Authorize(Roles = "StoreOwner,StoreManager,Seller,Cashier, Repurchaser")]
        public async Task<ActionResult<IReadOnlyList<CategoryDto>>> GetCategories()
        {
            var spec = new CategorySpecification();
            var categories = await _productService.GetAllCategoriesAsync(spec);
            var data = _mapper.Map<IReadOnlyList<Category>, IReadOnlyList<CategoryDto>>(categories);
            return Ok(data);
        }
    }
}
