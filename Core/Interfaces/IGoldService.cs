using Core.Enitities;
using Core.Specifications;
using Core.Specifications.Golds;

namespace Infrastructure.Services
{
    public interface IGoldService 
    {

        Task<IReadOnlyList<GoldType>> GetGoldTypesAsync(GoldTypeSpecification spec);
        Task<GoldType> GetGoldTypeByIdAsync(int id);
        Task<bool> AddGoldTypeAsync(GoldType goldType);
        Task<int> CountGoldTypesAsync(ISpecification<GoldType> spec);
        Task<IReadOnlyList<GoldPrice>> GetGoldPricesByIdAsync(GoldPriceSpecification spec);
        Task<bool> DeleteGoldTypeAsync(int id);
        Task<int> CountGoldPricesAsync(ISpecification<GoldPrice> spec);
        Task<bool> UpdateGoldPriceAsync(int goldTypeId, GoldPrice goldPrice);

    }
}