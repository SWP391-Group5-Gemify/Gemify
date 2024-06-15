using Core.Enitities;
using Core.Interfaces;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase _database;
        public BasketRepository(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<IReadOnlyList<CustomerBasket>> GetAllBasketsAsync()
        {
            // Get all the keys in redis server
            var endpoints = _database.Multiplexer.GetEndPoints();
            var server = _database.Multiplexer.GetServer(endpoints[0]);
            var keys = server.Keys();

            // Find basket by key and deserialize basket then add to baskets list
            var baskets = new List<CustomerBasket>();
            foreach (var key in keys)
            {
                var data = await _database.StringGetAsync(key);
                var basket = JsonSerializer.Deserialize<CustomerBasket>(data);
                baskets.Add(basket);
            }
            return baskets;
        }

        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            return await _database.KeyDeleteAsync(basketId);
        }

        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
            var data = await _database.StringGetAsync(basketId);
            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            var created = await _database.StringSetAsync(basket.Id, JsonSerializer.Serialize(basket), TimeSpan.FromDays(30));

            if (!created)
            {
                return null;
            }

            return await GetBasketAsync(basket.Id);
        }
    }
}
