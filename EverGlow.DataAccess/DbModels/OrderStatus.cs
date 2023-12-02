using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.DbModels
{
    [Table("OrderStatus")]
    public class OrderStatus
    {
        public int Id { get; set; }
        public Guid OrderId { get; set; }
        public Status Status { get; set; }
        public int CustomerId { get; set; }
        public DateTime OrderDate {get;set; }
    }

    public enum Status
    {
        New,
        InProcess,
        Shipped,
        Delivered
    }
}
