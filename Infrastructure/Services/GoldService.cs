using Core.Enitities;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore.Storage.Json;
using Microsoft.Identity.Client;

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


        public async Task<bool> DeleteGoldTypeAsync(int id)
        {
            var result = false;
            var spec = new GoldTypeSpecification(id);
            var exist_goldType = await _unitOfWork.Repository<GoldType>().GetByIdAsync(id);
            if(exist_goldType == null) return result ;
            exist_goldType.Status = false;       
            _unitOfWork.Repository<GoldType>().Update(exist_goldType);
            result = await _unitOfWork.Repository<GoldType>().SaveAllAsync();
            return result;
        }

        public async Task<int> CountGoldPricesAsync(int goldTypeId)
        {
            var goldPriceParams = new GoldPriceParams(){ goldTypeId = goldTypeId };
            var spec = new GoldPriceSpecification(goldPriceParams);
            var count = await _unitOfWork.Repository<GoldPrice>().CountAsync(spec);
            return count;
        }

    }
}