namespace Core.Specifications.Gems
{
    public class GemPriceSpecParams
    {
        private const int MaxPageSize = 50;
        public int PageIndex { get; set; } = 1;
        private int _pageSize = 30;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
        }

        public int? GemId { get; set; }

        public string Sort { get; set; }

        public string Datetime { get; set; }
    }
}
