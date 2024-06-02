using Core.Enitities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Core.Interfaces.Identity
{
    public class AppIdentityDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : base(options) 
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //Change AspNet table names to custom names
            builder.Entity<User>(entity =>
            {
                entity.ToTable(name: "User");
                entity.Property(u => u.UserName).HasColumnType("varchar(50)").IsRequired();
                entity.Property(u => u.PhoneNumber).HasColumnType("varchar(20)").IsRequired();
                entity.Property(u => u.Email).HasColumnType("varchar(100)").IsRequired();
            });

            builder.Entity<IdentityRole<int>>(entity =>
            {
                entity.ToTable(name: "Role");
                entity.Property(r => r.Name).HasColumnType("varchar(50)").IsRequired();
            });
            builder.Entity<IdentityUserRole<int>>(entity =>
            {
                entity.ToTable("UserRoles");
            });

            builder.Entity<IdentityUserClaim<int>>(entity =>
            {
                entity.ToTable("UserClaims");
            });

            builder.Entity<IdentityUserLogin<int>>(entity =>
            {
                entity.ToTable("UserLogins");
            });

            builder.Entity<IdentityRoleClaim<int>>(entity =>
            {
                entity.ToTable("RoleClaims");
            });

            builder.Entity<IdentityUserToken<int>>(entity =>
            {
                entity.ToTable("UserTokens");
            });
        }
    }
}
