using Core.Enitities;
using Core.Interfaces;
using Core.Specifications;
using Core.Specifications.Golds;

namespace Infrastructure.Services
{
    public class GoldService : IGoldService
    {
        private readonly IUnitOfWork _unitOfWork;

        public GoldService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // Get gold type list with specification
        public async Task<IReadOnlyList<GoldType>> GetGoldTypesAsync(GoldTypeSpecification spec)
        {
            var goldTypes = await _unitOfWork.Repository<GoldType>().ListAsync(spec);
            return goldTypes;
        }

        // Get gold type by id
        public async Task<GoldType> GetGoldTypeByIdAsync(int id)
        {
            var spec = new GoldTypeSpecification(id);
            var exist_goldType = await _unitOfWork.Repository<GoldType>().GetEntityWithSpec(spec);
            return exist_goldType;
        }

        // Add new gold type
        public async Task<bool> AddGoldTypeAsync(GoldType goldType)
        {
            // Add new gold type
            _unitOfWork.Repository<GoldType>().Add(goldType);
            var goldResult = await _unitOfWork.Complete();
            if(goldResult <= 0) return false;

            // Add gold prices to gold price history
            var newGoldPrice = new GoldPrice(goldType.Id,goldType.LatestBidPrice,goldType.LatestAskPrice);
            _unitOfWork.Repository<GoldPrice>().Add(newGoldPrice);
            var goldPriceResult = await _unitOfWork.Complete();

            return goldPriceResult > 0 ? true : false;
        }

        // Count number of gold types in list
        public async Task<int> CountGoldTypesAsync(ISpecification<GoldType> spec)
        {
            var count = await _unitOfWork.Repository<GoldType>().CountAsync(spec);
            return count;
        }

        // Get gold price history by gold type id
        public async Task<IReadOnlyList<GoldPrice>> GetGoldPricesByIdAsync(GoldPriceSpecification spec)
        {
            var goldPrices = await _unitOfWork.Repository<GoldPrice>().ListAsync(spec);
            return goldPrices;
        }

        // Disable gold type status
        public async Task<bool> DeleteGoldTypeAsync(int id)
        {
            var exist_goldType = await _unitOfWork.Repository<GoldType>().GetByIdAsync(id);
            if(exist_goldType == null) return false;
            exist_goldType.Status = false;       
            _unitOfWork.Repository<GoldType>().Update(exist_goldType);
            var result = await _unitOfWork.Repository<GoldType>().SaveAllAsync();
            return result;
        }

        // Count number of prices of gold type
        public async Task<int> CountGoldPricesAsync(ISpecification<GoldPrice> spec)
        {
            var count = await _unitOfWork.Repository<GoldPrice>().CountAsync(spec);
            return count;
        }

        // Update latest gold prices
        public async Task<bool> UpdateGoldPriceAsync(int goldTypeId, GoldPrice goldPrice)
        {            
            var exist_goldType = await _unitOfWork.Repository<GoldType>().GetByIdAsync(goldTypeId);
            if(exist_goldType == null) return false;

            // Add new prices to gold price history
            _unitOfWork.Repository<GoldPrice>().Add(goldPrice);

            // Check if gold price is < 0
            if (goldPrice.BidPrice < 0 || goldPrice.AskPrice < 0) return false;

            // Update gold type prices
            exist_goldType.LatestBidPrice = goldPrice.BidPrice;
            exist_goldType.LatestAskPrice = goldPrice.AskPrice;
            _unitOfWork.Repository<GoldType>().Update(exist_goldType);

            var result = await _unitOfWork.Complete();
            return result > 0 ? true : false;
        }
    }
}