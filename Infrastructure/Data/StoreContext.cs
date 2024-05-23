using Core.Enitities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
    
        public StoreContext(DbContextOptions<StoreContext> options) : base(options) 
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<GemType> Gemtypes { get; set; }
        public DbSet<GoldPrice> GoldPrices { get; set; }
        public DbSet<GoldType> GoldTypes { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductGem> ProductGems { get; set; }
        public DbSet<SaleCounter> SaleCounters { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }
        public DbSet<GemPrice> GemPrices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
