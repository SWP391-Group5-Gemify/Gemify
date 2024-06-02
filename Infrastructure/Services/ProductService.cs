using Core.Enitities;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Products;

namespace Infrastructure.Services
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IUnitOfWork UnitOfWork { get; }

        public async Task<bool> AddProductAsync(Product product)
        {
            // Add product to Product List
            _unitOfWork.Repository<Product>().Add(product);

            // save to db
            var result = await _unitOfWork.Complete();

            if (result <= 0) return false;
            return true;
        }

        public async Task<int> CountProductsAsync(ISpecification<Product> spec)
        {
            return await _unitOfWork.Repository<Product>().CountAsync(spec);
        }

        // Get product by id
        public async Task<Product> GetProductByIdAsync(int id)
        {
            var spec = new ProductSpecification(id);
            return await _unitOfWork.Repository<Product>().GetEntityWithSpec(spec);
        }

        // Get products with specification
        public async Task<IReadOnlyList<Product>> GetProductsAsync(ISpecification<Product> spec)
        {
            return await _unitOfWork.Repository<Product>().ListAsync(spec);
        }       

        public async Task<bool> UpdateProductAsync(Product product)
        {
            _unitOfWork.Repository<Product>().Update(product);
            var result = await _unitOfWork.Complete();
            return result > 0;
        }

        public async Task<IReadOnlyList<Category>> GetAllCategoriesAsync(ISpecification<Category> spec)
        {
            return await _unitOfWork.Repository<Category>().ListAsync(spec);
        }
    }
}
