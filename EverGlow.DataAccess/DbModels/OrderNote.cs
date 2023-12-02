using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.DbModels
{
    [Table("OrderNote")]
    public class OrderNote
    {
        public int Id { get; set; }
        public string NoteText { get; set; } = string.Empty;
        public int OrderStatusId {get;set;}
        public DateTime Date { get; set; }
    }
}
