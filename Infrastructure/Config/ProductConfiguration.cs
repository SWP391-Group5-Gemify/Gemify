using Core.Enitities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(x => x.Status)
               .HasConversion(
               s => s.ToString(),
               s => (ProductStatus)Enum.Parse(typeof(ProductStatus), s)
               );
        }
    }
}
