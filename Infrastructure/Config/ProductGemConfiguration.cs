using Core.Enitities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config
{
    public class ProductGemConfiguration : IEntityTypeConfiguration<ProductGem>
    {
        public void Configure(EntityTypeBuilder<ProductGem> builder)
        {
            builder.HasKey(k => new { k.ProductId, k.GemTypeId });
        }
    }
}
