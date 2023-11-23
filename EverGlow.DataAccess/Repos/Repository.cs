using EverGlow.DataAccess.DbContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.Repos
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly EverGlowDbContext _context;

        public Repository(EverGlowDbContext context)
        {
            _context = context;
        }

        public async Task<T> Create(T model)
        {
            EntityEntry<T> entityEntry = await _context.Set<T>().AddAsync(model);
            await _context.SaveChangesAsync();

            return entityEntry.Entity;
        }

        public async Task Delete(T model)
        {
            _context.Set<T>().Remove(model);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task<List<T>> GetAll()
        {
            List<T> entities = await _context.Set<T>().ToListAsync();

            return entities;
        } 

        public async Task<T> Update(T model)
        {
            EntityEntry<T> entityEntry = _context.Set<T>().Update(model);
            await _context.SaveChangesAsync();

            return entityEntry.Entity;
        }
    }
}
