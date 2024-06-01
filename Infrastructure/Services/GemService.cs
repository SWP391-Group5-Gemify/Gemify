using Core.Enitities;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class GemService : IGemService
    {
        private readonly IUnitOfWork _unitOfWork;

        public GemService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<bool> AddGem(GemType gemType)
        {
            //Add Gem Type first to retrieve ID
            _unitOfWork.Repository<GemType>().Add(gemType);
            var gemResult = await _unitOfWork.Complete();
            if (gemResult <= 0) return false;

            //Add Gem Price to history after retrieving ID
            var gemPrice = new GemPrice(gemType.Id, gemType.LatestPrice);
            _unitOfWork.Repository<GemPrice>().Add(gemPrice);
            var gemPriceResult = await _unitOfWork.Complete();

            return gemPriceResult > 0 ? true : false;
        }

        public async Task<bool> DeleteGem(int id)
        {
            var gemType = await _unitOfWork.Repository<GemType>().GetByIdAsync(id);

            if (gemType == null) return false;

            gemType.Status = false;

            _unitOfWork.Repository<GemType>().Update(gemType);
            var result = await _unitOfWork.Complete();
            return result > 0 ? true : false;
        }

        public async Task<IReadOnlyList<GemType>> GetGemsAsync(ISpecification<GemType> spec)
        {
            return await _unitOfWork.Repository<GemType>().ListAsync(spec);
        }

        public async Task<GemType> GetGemAsync(ISpecification<GemType> spec)
        {
            return await _unitOfWork.Repository<GemType>().GetEntityWithSpec(spec);
        }

        public async Task<bool> UpdateGemPrice(GemPrice gemPrice)
        {
            var gemType =  await _unitOfWork.Repository<GemType>().GetByIdAsync(gemPrice.GemTypeId);

            if (gemType == null) return false;

            //Update latest price of the Gem
            gemType.LatestPrice = gemPrice.Price;
            _unitOfWork.Repository<GemType>().Update(gemType);

            //Add new price update to the gem price history
            _unitOfWork.Repository<GemPrice>().Add(gemPrice);

            var result = await _unitOfWork.Complete();

            return result > 0 ? true : false;
        }

        public async Task<int> CountGemAsync(ISpecification<GemType> spec)
        {
            return await _unitOfWork.Repository<GemType>().CountAsync(spec);
        }

        public async Task<int> CountGemPricesAsync(ISpecification<GemPrice> spec)
        {
            return await _unitOfWork.Repository<GemPrice>().CountAsync(spec);
        }

        public async Task<IReadOnlyList<GemPrice>> GetGemPrices(ISpecification<GemPrice> spec)
        {
            return await _unitOfWork.Repository<GemPrice>().ListAsync(spec);
        }
    }
}
