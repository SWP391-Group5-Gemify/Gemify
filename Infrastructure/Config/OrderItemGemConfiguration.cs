using Core.Enitities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config
{
    public class OrderItemGemConfiguration : IEntityTypeConfiguration<OrderItemGem>
    {
        public void Configure(EntityTypeBuilder<OrderItemGem> builder)
        {
            builder.OwnsOne(gi => gi.GemsItemOrdered, gio => { gio.WithOwner(); });
        }
    }
}
