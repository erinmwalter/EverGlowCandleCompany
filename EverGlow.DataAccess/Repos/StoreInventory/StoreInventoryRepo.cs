using Dapper;
using EverGlow.DataAccess.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace EverGlow.DataAccess.Repos.StoreInventory
{
    public class StoreInventoryRepo : IStoreInventoryRepo
    {
        private readonly EverGlowDbContext _context;

        public StoreInventoryRepo(EverGlowDbContext context)
        {
            _context = context;
        }

        public async Task<List<InventoryItem>> GetAllInventoryItemsAsync()
        {
            var query = """SELECT * FROM public."StoreInventory" """;

            using(var connection = _context.CreateConnection())
            {
                connection.Open();
                var inventoryItems = await connection.QueryAsync<InventoryItem>(query);
                connection.Close();

                if (inventoryItems.Any())
                {
                    return inventoryItems.ToList();
                }
                else
                {
                    return new List<InventoryItem>();
                }
            }
        }
    }
}
