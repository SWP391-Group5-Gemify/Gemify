using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Enitities.OrderAggregate
{
    public class OrderType : BaseEntity
    {
        [Column(TypeName = "varchar(50)")]
        public string Name { get; set; }
    }
}
