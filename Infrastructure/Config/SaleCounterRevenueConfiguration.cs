using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Core.Enitities;

namespace Infrastructure.Config
{  
    public class SaleCounterRevenueConfiguration : IEntityTypeConfiguration<SaleCounterRevenue>
    {
        public void Configure(EntityTypeBuilder<SaleCounterRevenue> builder)
        {
            builder.HasOne(s => s.SaleCounter).WithMany()
                .HasForeignKey(s => s.SaleCounterId);
        }
    }
}
