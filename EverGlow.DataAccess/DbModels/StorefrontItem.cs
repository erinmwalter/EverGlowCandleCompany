using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.DbModels
{
    [Table("StorefrontItem")]
    public class StorefrontItem
    {
        public int Id {get;set;}
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public int NumInStock { get; set; }
        public bool IsOnSale { get; set; }
        public int DiscountPercent { get; set; }
        public bool IsFeaturedItem { get; set; }
    }
}
