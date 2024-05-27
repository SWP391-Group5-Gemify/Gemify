using Core.Enitities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IProductService
    {
        Task<IReadOnlyList<Product>> GetProductsAsync(ISpecification<Product> spec);
        Task<Product> GetProductByIdAsync(int id);
        Task<Product> AddProductAsync(Product product, GemType gem);
        void RemoveProductAsync(Product product);
        Task<int> CountProductsAsync();

    }
}
