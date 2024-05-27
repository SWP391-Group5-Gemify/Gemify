
using Core.Enitities;
using Core.Interfaces;
using Core.Specifications;
using System.Reflection.Metadata.Ecma335;

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

        public Task<Product> AddProductAsync(Product product, GemType gem)
        {
            throw new NotImplementedException();
        }

        public Task<int> CountProductsAsync()
        {
            throw new NotImplementedException();
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

        public void RemoveProductAsync(Product product)
        {
            throw new NotImplementedException();
        }
    }
}
