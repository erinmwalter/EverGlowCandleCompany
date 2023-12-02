using EverGlow.DataAccess.DbModels;
using EverGlow.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.Services
{
    public interface IOrderFacade
    {
        Task<Order> GetOrderByOrderStatusIdAsync(int orderStatusId);
        Task<OrderNote> PostNoteToDatabaseAsync(OrderNote note);
    }
}
