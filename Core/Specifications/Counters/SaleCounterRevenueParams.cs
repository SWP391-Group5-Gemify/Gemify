namespace Core.Specifications.Counters
{
    public class SaleCounterRevenueParams
    {
        private int _saleCounterId;
        public int saleCounterId 
        { 
            get => _saleCounterId;
            set => _saleCounterId = value;
        }

        private const int MaxPageSize = 50;
        public int PageIndex { get; set; } = 1;
        private int _pageSize = 30;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
        }
    }
}