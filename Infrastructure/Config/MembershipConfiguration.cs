using Core.Enitities;
using Core.Enitities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Config
{
    public class MembershipConfiguration : IEntityTypeConfiguration<Membership>
    {
        public void Configure(EntityTypeBuilder<Membership> builder)
        {
            builder.Property(m => m.Discount).HasColumnType("decimal(5,2)");

            builder.Property(m => m.Name).HasMaxLength(50);
        }
    }
}