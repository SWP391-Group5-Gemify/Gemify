using Core.Enitities;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Dtos
{
    public class SaleCounterRevenueYearlyDto
    {
        public decimal Revenue { get; set; }
        public int? SaleCounterId { get; set; }
        public string SaleCounterName { get; set; }
    }
}
