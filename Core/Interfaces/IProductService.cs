using Core.Enitities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IProductService
    {
        Task<IReadOnlyList<Product>> GetProductsAsync(ISpecification<Product> spec);
        Task<Product> GetProductByIdAsync(int id);
        Task<bool> AddProductAsync(Product product);
        void RemoveProductAsync(Product product);
        Task<int> CountProductsAsync(ISpecification<Product> spec);

    }
}
