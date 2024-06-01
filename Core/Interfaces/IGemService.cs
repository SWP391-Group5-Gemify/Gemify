using Core.Enitities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGemService
    {
        Task<IReadOnlyList<GemType>> GetGemsAsync(ISpecification<GemType> spec);

        Task<GemType> GetGemAsync(ISpecification<GemType> spec);

        Task<int> CountGemAsync(ISpecification<GemType> spec);

        Task<int> CountGemPricesAsync(ISpecification<GemPrice> spec);


        Task<IReadOnlyList<GemPrice>> GetGemPrices(ISpecification<GemPrice> spec);

        Task<bool> UpdateGemPrice(GemPrice gemPrice);
        Task<bool> DeleteGem(int id);
        Task<bool> AddGem(GemType gemType);
    }
}
