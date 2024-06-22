namespace Core.Specifications.Products
{
    public class ProductParams
    {
        private string _search;

        public string Search
        {
            get => _search;
            set => _search = value.ToLower();
        }

        private const int MaxPageSize = 50;
        public int PageIndex { get; set; } = 1;
        private int _pageSize = 6;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
        }
        public string Sort { get; set; }

        public int? GoldTypeId { get; set; }
        public int? CategoryId { get; set; }
        public int? SubCategoryId { get; set; }
        public string Status { get; set; }


    }
}
