using Core.Enitities;
using Core.Enitities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Config
{
    public class ReceiptConfiguration : IEntityTypeConfiguration<Receipt>
    {
        public void Configure(EntityTypeBuilder<Receipt> builder)
        {
            builder.HasOne(c => c.Customer).WithMany()
                .HasForeignKey(r => r.CustomerId);

            builder.HasOne(u => u.User).WithMany()
                .HasForeignKey(r => r.UserId);

            builder.HasOne(p => p.Promotion).WithMany()
                .HasForeignKey(r => r.PromotionId);
        }
    }
}