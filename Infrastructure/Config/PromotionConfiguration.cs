using Core.Enitities;
using Core.Enitities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Config
{
    public class PromotionConfiguration : IEntityTypeConfiguration<Promotion>
    {
        public void Configure(EntityTypeBuilder<Promotion> builder)
        {
            builder.Property(p => p.Name).HasMaxLength(200);

            builder.Property(p => p.Discount).HasColumnType("decimal(5,2)");

            builder.Property(p => p.Code).HasMaxLength(100);

            builder.Property(p => p.MinValue).HasColumnType("decimal(18,2)");

        }
    }
}