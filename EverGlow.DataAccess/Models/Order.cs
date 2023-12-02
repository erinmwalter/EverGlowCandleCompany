using EverGlow.DataAccess.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.Models
{
    public class Order
    {
        public OrderStatus? orderStatusItem { get; set; } 
        public Customer? customer { get; set; }
        public List<CustomizedItem> orderedItems { get; set; } = new List<CustomizedItem>();
        public List<OrderNote> orderNotes { get; set; } = new List<OrderNote>();
    }
}
