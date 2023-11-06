using Dapper;
using EverGlow.DataAccess.DbContexts;
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

        public Task<List<InventoryItem>> GetAllInventoryItemsAsync()
        {
            throw new NotImplementedException();
        }
    }
}
