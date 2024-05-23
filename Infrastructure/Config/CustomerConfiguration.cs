using Core.Enitities;
using Core.Enitities.Identity;
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
            
            builder.HasOne(m => m.CustomerMembership).WithOne()
                .HasForeignKey<Customer>(c => c.Customer_MembershipId);

            builder.Property(c => c.Name).HasMaxLength(100);

            builder.Property(c => c.Phone).HasMaxLength(20);

            builder.Property(c => c.Address).HasMaxLength(200);
        }
    }
}