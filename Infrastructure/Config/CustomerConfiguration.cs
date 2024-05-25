using Core.Enitities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Config
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.Property(c => c.Gender)
                .HasConversion(
                    c => c.ToString(),
                    c => (Gender) Enum.Parse(typeof(Gender), c)
                );
            
            builder.HasOne(m => m.Membership).WithMany()
                .HasForeignKey(c => c.MembershipId);
        }
    }
}