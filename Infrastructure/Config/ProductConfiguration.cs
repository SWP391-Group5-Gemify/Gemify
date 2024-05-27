using Core.Enitities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Status)
                .HasConversion(
                    ps => ps.ToString(),
                    ps => (ProductStatus)Enum.Parse(typeof(ProductStatus), ps)
                );

            builder.HasOne(p => p.GoldType)
                .WithMany()
                .HasForeignKey(p => p.GoldTypeId);

            builder.HasOne(p => p.SubCategory)
                .WithMany()
                .HasForeignKey(p => p.SubCategoryId);

            builder.HasOne(p => p.SaleCounter)
                .WithMany()
                .HasForeignKey(p => p.SaleCounterId);

            builder.HasMany(p => p.Gems)
                .WithMany(p => p.Products)
                .UsingEntity<ProductGem>();
        }
    }
}
