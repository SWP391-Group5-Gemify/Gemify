using Core.Enitities;
using Core.Enitities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Core.Interfaces.Identity
{
    public class AppIdentityDbContext : IdentityDbContext<User>
    {
        public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : base(options) 
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>(entity =>
            {
                entity.Property(u => u.UserName).HasColumnType("varchar(50)").IsRequired();
                entity.Property(u => u.PhoneNumber).HasColumnType("varchar(20)").IsRequired();
                entity.Property(u => u.Email).HasColumnType("varchar(100)").IsRequired();

                entity.Property(a => a.Gender)
                .HasConversion(
                    g => g.ToString(),
                    g => (Gender)Enum.Parse(typeof(Gender), g)
                );

                entity.Property(s => s.Status)
                    .HasConversion(
                        u => u.ToString(),
                        u => (UserStatus)Enum.Parse(typeof(UserStatus), u)
                    );
            });

            builder.Entity<IdentityRole>(entity =>
            {
                entity.Property(r => r.Name).HasColumnType("varchar(50)").IsRequired();
            });


            //Change AspNet table names to custom names
            builder.Entity<User>(entity =>
            {
                entity.ToTable(name: "User");
            });

            builder.Entity<IdentityRole>(entity =>
            {
                entity.ToTable(name: "Role");
            });
            builder.Entity<IdentityUserRole<string>>(entity =>
            {
                entity.ToTable("UserRoles");
            });

            builder.Entity<IdentityUserClaim<string>>(entity =>
            {
                entity.ToTable("UserClaims");
            });

            builder.Entity<IdentityUserLogin<string>>(entity =>
            {
                entity.ToTable("UserLogins");   
            });

            builder.Entity<IdentityRoleClaim<string>>(entity =>
            {
                entity.ToTable("RoleClaims");

            });

            builder.Entity<IdentityUserToken<string>>(entity =>
            {
                entity.ToTable("UserTokens");
            });
        }
    }
}
