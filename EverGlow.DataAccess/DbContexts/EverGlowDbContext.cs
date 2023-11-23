using EverGlow.DataAccess.DbModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.DbContexts
{
    public class EverGlowDbContext : DbContext
    {
        public DbSet<InventoryItem> InventoryItems { get; set; }

        public EverGlowDbContext(DbContextOptions<EverGlowDbContext> options) : base(options) { }
    }
}
