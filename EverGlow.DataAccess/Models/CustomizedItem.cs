using EverGlow.DataAccess.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.Models
{
    public class CustomizedItem
    {
        public int Id { get; set; }
        public int OrderStatusId { get; set; }
        public StorefrontItem StorefrontItem { get; set; }
        public CandleType CandleType { get; set; }
        public int CandleSize { get; set; }
        public ContainerColor ContainerColor { get; set; }
        public double ItemPrice { get; set; }
    }
}
