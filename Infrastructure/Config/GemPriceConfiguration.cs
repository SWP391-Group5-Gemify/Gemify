using Core.Enitities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config
{
    public class GemPriceConfiguration : IEntityTypeConfiguration<GemPrice>
    {
        public void Configure(EntityTypeBuilder<GemPrice> builder)
        {
            builder.HasOne(g => g.GemType)
                .WithMany()
                .HasForeignKey(g => g.GemTypeId);
        }
    }
}
