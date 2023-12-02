using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.DbModels
{
    [Table("StoreInventoryStorefrontItem")]
    public class StoreInventoryStorefrontItem
    {
        public int Id { get; set; }
        public int StoreInventoryId { get; set; }
        public int StorefrontItemId { get; set; }
    }
}
