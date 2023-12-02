using EverGlow.DataAccess.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.Services
{
    public interface IOrderStatusCache
    {
        Task<List<OrderStatus>> GetAllOrderStatusesAsync();
        Task<List<Customer>> GetAllCustomersAsync();
        Task<List<OrderNote>> GetAllOrderNotesAsync();
        Task<List<OrderedItem>> GetAllOrderedItemsAsync();
        Task<List<StorefrontItem>> GetAllStorefrontItemsAsync();
    }
}
