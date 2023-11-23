using EverGlow.DataAccess.DbContexts;
using EverGlow.DataAccess.DbModels;
using EverGlow.DataAccess.Repos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess
{
    public static class ConfigureDbServices
    {
        public static void AddDbServices(this IServiceCollection services, DbConnectionOptions config)
        {
            services.AddDbContext<EverGlowDbContext>(options =>
                    options.UseNpgsql(config.ConnectionString));

            services.AddTransient<IRepository<InventoryItem>, Repository<InventoryItem>>();

        }
    }
}
