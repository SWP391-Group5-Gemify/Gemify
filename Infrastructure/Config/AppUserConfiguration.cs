using Core.Enitities;
using Core.Enitities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Config
{
    public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder.Property(s => s.Gender)
                .HasConversion(
                    g => g.ToString(),
                    g => (Gender)Enum.Parse(typeof(Gender), g)
                );
            builder.Property(s => s.Status)
                .HasConversion(
                    u => u.ToString(),
                    u => (UserStatus)Enum.Parse(typeof(UserStatus), u)
                );
        }
    }
}
