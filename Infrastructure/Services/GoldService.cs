using Core.Enitities;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore.Storage.Json;

namespace Infrastructure.Services
{
    public class GoldService 
    {
        private readonly UnitOfWork _unitOfWork;

        public Task<IReadOnlyList<GoldType>> GetAllGoldTypes()
        {
            var allGoldTypes = _unitOfWork.Repository<GoldType>().ListAllAsync();
            return allGoldTypes;
        }

        public Task<IReadOnlyList<GoldPrice>> GetGoldPricesByGoldTypeId(GoldPriceSpecification spec)
        {
            var goldPrices = _unitOfWork.Repository<GoldPrice>().ListAsync(spec);
            return goldPrices;
        }

    }
}