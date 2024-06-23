using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Core.Enitities;

namespace Infrastructure.Config
{  
    public class SaleCounterConfiguration : IEntityTypeConfiguration<SaleCounter>
    {
        public void Configure(EntityTypeBuilder<SaleCounter> builder)
        {
            builder.HasMany(s => s.SaleCounterRevenue).WithOne()
                .HasForeignKey(s => s.SaleCounterId);
        }
    }
}
