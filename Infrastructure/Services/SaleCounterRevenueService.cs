using Core.Enitities;
using Core.Interfaces;

namespace Infrastructure.Services
{
    public class SaleCounterRevenueService : ISaleCounterRevenueService
    {
        private readonly IUnitOfWork _unitOfWork;

        public SaleCounterRevenueService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        
        public async Task<IReadOnlyList<SaleCounterRevenue>> GetSaleCounterRevenuesByIdAsync(int id)
        {
            return await _unitOfWork.Repository<SaleCounterRevenue>.GetAsync(id);
        }
    }
}