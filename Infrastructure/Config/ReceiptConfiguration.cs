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
            builder.HasOne(c => c.ReceiptCustomer).WithMany()
                .HasForeignKey(r => r.Receipt_CustomerId);

            builder.HasOne(u => u.ReceiptUser).WithMany()
                .HasForeignKey(r => r.Receipt_UserId);

            builder.HasOne(p => p.ReceiptPromotion).WithMany()
                .HasForeignKey(r => r.Receipt_PromotionId);

            builder.Property(r => r.TotalPrice).HasColumnType("decimal(18,2)");

        }
    }
}