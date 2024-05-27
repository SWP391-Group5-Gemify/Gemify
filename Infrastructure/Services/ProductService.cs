
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

        //public async Task<Product> AddProductAsync(Product product, GemType gem)
        //{
        //    // Add product to Product List
        //    _unitOfWork.Repository<Product>().Add(product);

        //    // Add gem to Gem List if this gem hasn't existed
        //    _unitOfWork.Repository<GemType>().Add(gem);

        //    // Add productGem to ProductGem List
        //    var pg = new ProductGem { ProductId = product.Id, GemTypeId = gem.Id};
        //    _unitOfWork.Repository<ProductGem>().Add();

        //}

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

        public void RemoveProductAsync(Product product)
        {
            throw new NotImplementedException();
        }
    }
}
