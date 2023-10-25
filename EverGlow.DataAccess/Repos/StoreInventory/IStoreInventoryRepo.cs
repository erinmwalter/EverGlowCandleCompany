using EverGlow.DataAccess.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.Repos.StoreInventory
{
    public interface IStoreInventoryRepo
    {
        Task<List<InventoryItem>> GetAllInventoryItemsAsync();
    }
}
