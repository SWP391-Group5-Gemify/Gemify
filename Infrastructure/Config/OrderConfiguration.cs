using Core.Enitities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasMany(o => o.OrderItems).WithOne();
            builder.HasOne(o => o.Customer).WithMany().HasForeignKey(o => o.CustomerId);
            builder.HasOne(o => o.User).WithMany().HasForeignKey(o => o.UserId);
            builder.HasOne(o => o.OrderType).WithMany().HasForeignKey(o =>o.OrderTypeId);
            builder.HasOne(o => o.Receipt).WithMany().HasForeignKey(o => o.ReceiptId).OnDelete(DeleteBehavior.NoAction);

        }
    }
}
