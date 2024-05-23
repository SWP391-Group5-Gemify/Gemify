using Core.Enitities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config
{
    public class GoldTypeConfiguration : IEntityTypeConfiguration<GoldType>
    {
        public void Configure(EntityTypeBuilder<GoldType> builder)
        {
            builder.Property(x => x.Unit)
                .HasConversion(
                s => s.ToString(),
                s => (GoldUnit) Enum.Parse(typeof(GoldUnit), s)
                );
        }
    }
}
