using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.DbModels
{
    [Table("Customer")]
    public class Customer
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Address { get; set; }
        public string? Zip { get; set; }
        public string? StateCode { get; set; }
        public string? City { get; set; }
        public string? Phone { get; set; }
    }
}
