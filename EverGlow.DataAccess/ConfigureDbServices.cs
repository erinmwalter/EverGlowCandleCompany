using EverGlow.DataAccess.DbContexts;
using EverGlow.DataAccess.DbModels;
using EverGlow.DataAccess.Repos;
using EverGlow.DataAccess.Services;
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
            services.AddTransient<IRepository<OrderStatus>, Repository<OrderStatus>>();
            services.AddTransient<IRepository<StorefrontItem>, Repository<StorefrontItem>>();
            services.AddTransient<IRepository<OrderNote>, Repository<OrderNote>>();
            services.AddTransient<IRepository<Customer>, Repository<Customer>>();
            services.AddTransient<IRepository<OrderedItem>, Repository<OrderedItem>>();
            services.AddTransient<IRepository<StoreInventoryStorefrontItem>, Repository<StoreInventoryStorefrontItem>>();
            services.AddTransient<IOrderFacade, OrderFacade>();
            //services.AddTransient<IOrderStatusCache, OrderStatusCache>();
        }
    }
}
