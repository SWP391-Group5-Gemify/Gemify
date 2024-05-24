

using System.Security.Cryptography;
using System.Text.Json;
using System.Text;
using Core.Enitities;
using System.Reflection;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {

        public static async Task SeedAsync(StoreContext context)
        {
            var path = Path.GetDirectoryName(Environment.CurrentDirectory);

            //Seed Category Data
            if (!context.Categories.Any())
            {
                var data = await File.ReadAllTextAsync(path + @"/Infrastructure/Data/SeedData/CategorySeedData.json");

                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

                var list = JsonSerializer.Deserialize<List<Category>>(data, options);

                foreach (var item in list)
                {
                    context.Categories.Add(item);
                }

                await context.SaveChangesAsync();
            }

            // Seed Sub Category Data

            if (!context.SubCategories.Any())
            {
                var data = await File.ReadAllTextAsync(path + @"/Infrastructure/Data/SeedData/SubCategorySeedData.json");

                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

                var list = JsonSerializer.Deserialize<List<SubCategory>>(data, options);

                foreach (var item in list)
                {
                    context.SubCategories.Add(item);
                }

                await context.SaveChangesAsync();
            }

            // Seed Gold Type Data
            if (!context.GoldTypes.Any())
            {
                var data = await File.ReadAllTextAsync(path + @"/Infrastructure/Data/SeedData/GoldTypeSeedData.json");

                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

                var list = JsonSerializer.Deserialize<List<GoldType>>(data, options);

                foreach (var item in list)
                {
                    context.GoldTypes.Add(item);
                }

                await context.SaveChangesAsync();
            }

            // Seed Gold Price Data
            if (!context.GoldPrices.Any())
            {
                var data = await File.ReadAllTextAsync(path + @"/Infrastructure/Data/SeedData/GoldPriceSeedData.json");

                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

                var list = JsonSerializer.Deserialize<List<GoldPrice>>(data, options);

                foreach (var item in list)
                {
                    context.GoldPrices.Add(item);
                }

                await context.SaveChangesAsync();
            }

            // Seed Gem Type Data
            if (!context.GemTypes.Any())
            {
                var data = await File.ReadAllTextAsync(path + @"/Infrastructure/Data/SeedData/GemTypeSeedData.json");

                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

                var list = JsonSerializer.Deserialize<List<GemType>>(data, options);

                foreach (var item in list)
                {
                    context.GemTypes.Add(item);
                }

                await context.SaveChangesAsync();
            }

            //Seed Sale Counter
            if (!context.SaleCounters.Any())
            {
                var data = await File.ReadAllTextAsync(path + @"/Infrastructure/Data/SeedData/SaleCounter.json");

                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

                var list = JsonSerializer.Deserialize<List<SaleCounter>>(data, options);

                foreach (var item in list)
                {
                    context.SaleCounters.Add(item);
                }

                await context.SaveChangesAsync();
            }

            // Seed Product Data

            if (!context.Products.Any())
            {
                var data = await File.ReadAllTextAsync(path + @"/Infrastructure/Data/SeedData/Product.json");

                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

                var list = JsonSerializer.Deserialize<List<Product>>(data, options);

                foreach (var item in list)
                {
                    context.Products.Add(item);
                }

                await context.SaveChangesAsync();
            }

            // Seed Product Gem Data
            if (!context.ProductGems.Any())
            {
                var data = await File.ReadAllTextAsync(path + @"/Infrastructure/Data/SeedData/ProductGemSeedData.json");

                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

                var list = JsonSerializer.Deserialize<List<ProductGem>>(data, options);

                foreach (var item in list)
                {
                    context.ProductGems.Add(item);
                }

                await context.SaveChangesAsync();
            }
        }
    }
       
}
