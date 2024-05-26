

namespace Core.Specifications
{
    public class SaleCounterParams
    {
        private string _search;

        public string Search
        {
            get => _search;
            set => _search = value.ToLower();
        }

        public bool? Status { get; set; }
    }
}
