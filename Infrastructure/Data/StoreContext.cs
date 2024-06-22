using Core.Enitities;
using Core.Enitities.Identity;
using Core.Enitities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
    
        public StoreContext(DbContextOptions<StoreContext> options) : base(options) 
        {
        }

        public DbSet<Membership> Memberships { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<GemType> GemTypes { get; set; }
        public DbSet<GoldPrice> GoldPrices { get; set; }
        public DbSet<GoldType> GoldTypes { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductGem> ProductGems { get; set; }
        public DbSet<SaleCounter> SaleCounters { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }
        public DbSet<GemPrice> GemPrices { get; set; }
        public DbSet<OrderType> OrderTypes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<OrderItemGem> OrderItemGems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().ToTable(nameof(User), t => t.ExcludeFromMigrations());
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
