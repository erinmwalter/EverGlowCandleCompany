using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.Repos
{
    public interface IRepository<T> where T : class
    {
        Task<T> Create(T model);
        Task Delete(T model);
        Task<List<T>> GetAll();
        Task<T> Update(T model);
    }
}
