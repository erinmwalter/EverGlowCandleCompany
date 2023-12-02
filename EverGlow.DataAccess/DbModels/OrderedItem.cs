using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.DbModels
{
    [Table("OrderedItem")]
    public class OrderedItem
    {
        public int Id { get; set; }
        public int OrderStatusId { get; set; }
        public int StorefrontItemId { get; set; }
        public CandleType CandleType { get; set; }
        public int CandleSize { get; set; }
        public ContainerColor ContainerColor { get; set; }
        public double ItemPrice { get; set; }
    }

    public enum CandleType
    {
        Regular,
        WoodWick
    }

    public enum ContainerColor
    {
        Clear,
        Green,
        Amber
    }

}
