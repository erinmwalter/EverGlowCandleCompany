using EverGlow.DataAccess.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.Repos.StoreInventory
{
    public class InMemoryInventoryRepo : IStoreInventoryRepo
    {
        private List<InventoryItem> _inMemoryInventory;

        public InMemoryInventoryRepo()
        {
            _inMemoryInventory = new List<InventoryItem>();

            _inMemoryInventory.Add(new InventoryItem()
            {
                Id = 1,
                Name = "Green Jar",
                Description = "Jar, Green, 8oz, pack of 12",
                SupplierName = "Jars Galore",
                SupplierId = "12345",
                NumberInStock = 10,
                LowStockNumber = 2,
                PricePerUnit = 1.99,
                DateLastReordered = new DateTime(2023, 8, 1),
                LastUpdateDate = DateTime.Now,
                LastUpdateBy = "ewalter"
            });

            _inMemoryInventory.Add(new InventoryItem()
            {
                Id = 2,
                Name = "Amber Jar",
                Description = "Jar, Amber, 8oz, pack of 12",
                SupplierName = "Jars Galore",
                SupplierId = "98765",
                NumberInStock = 8,
                LowStockNumber = 2,
                PricePerUnit = 1.99,
                DateLastReordered = new DateTime(2023, 8, 1),
                LastUpdateDate = DateTime.Now,
                LastUpdateBy = "ewalter"
            });

            _inMemoryInventory.Add(new InventoryItem()
            {
                Id = 3,
                Name = "Candle Wicks",
                Description = "Wick, 6in, white, 100 pack",
                SupplierName = "Candles R Us",
                SupplierId = "WI432000334",
                NumberInStock = 5,
                LowStockNumber = 1,
                PricePerUnit = 3.99,
                DateLastReordered = new DateTime(2023, 8, 10),
                LastUpdateDate = DateTime.Now,
                LastUpdateBy = "ewalter"
            });

            _inMemoryInventory.Add(new InventoryItem()
            {
                Id = 4,
                Name = "Candle Label",
                Description = "Label, Cream, 2 inches, 50 pack",
                SupplierName = "Labels Direct",
                SupplierId = "CR2L012AC0023",
                NumberInStock = 4,
                LowStockNumber = 1,
                PricePerUnit = 4.99,
                DateLastReordered = new DateTime(2023, 8, 1),
                LastUpdateDate = DateTime.Now,
                LastUpdateBy = "ewalter"
            });
        }

        public async Task<List<InventoryItem>> GetAllInventoryItemsAsync()
        {
            return _inMemoryInventory;
        }

    }
}
