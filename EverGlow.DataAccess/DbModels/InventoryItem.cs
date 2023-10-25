using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.DbModels
{
    public class InventoryItem
    {
        public int Id { get;set; }
        public string Name { get; set; } = String.Empty;
        public string SupplierName { get; set; } = String.Empty;
        public string SupplierId { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public int NumberInStock { get; set; }
        public int LowStockNumber { get; set; }
        public double PricePerUnit { get; set; }
        public DateTime DateLastReordered { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public string LastUpdateBy { get; set; } = String.Empty;
    }
}
