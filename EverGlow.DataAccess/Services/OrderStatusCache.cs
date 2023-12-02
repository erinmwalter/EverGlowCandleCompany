using EverGlow.DataAccess.DbModels;
using EverGlow.DataAccess.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.Services
{
    public class OrderStatusCache : IOrderStatusCache
    {
        private List<OrderStatus> orderStatusRepo;
        private List<Customer> customerRepo;
        private List<OrderNote> orderNoteRepo;
        private List<StorefrontItem> storefrontItemRepo;
        private List<OrderedItem> orderedItemRepo;
        private DateTime DateLastUpdated;
        private TimeSpan RefreshInterval;

        private readonly IRepository<OrderStatus> _orderStatusService;
        private readonly IRepository<Customer> _customerService;
        private readonly IRepository<OrderNote> _orderNotes;
        private readonly IRepository<OrderedItem> _orderedItemService;
        private readonly IRepository<StorefrontItem> _sfItemsService;

        public OrderStatusCache(IRepository<OrderStatus> orderStatusService, IRepository<Customer> customerService, IRepository<OrderNote> orderNotes,
            IRepository<OrderedItem> orderedItemService, IRepository<StorefrontItem> sfItemsService)
        {
            orderStatusRepo = new List<OrderStatus>();
            customerRepo = new List<Customer>();
            orderNoteRepo = new List<OrderNote>();
            storefrontItemRepo = new List<StorefrontItem>();
            orderedItemRepo = new List<OrderedItem>();

            _orderedItemService = orderedItemService;
            _customerService = customerService;
            _orderNotes = orderNotes;
            _orderStatusService = orderStatusService;
            _sfItemsService = sfItemsService;
            RefreshInterval = TimeSpan.FromMinutes(10);

            LoadCache();  
        }

        private async Task LoadCache()
        {
            orderStatusRepo.Clear();
            orderStatusRepo = await _orderStatusService.GetAll();

            customerRepo.Clear();
            customerRepo = await _customerService.GetAll();

            orderNoteRepo.Clear();
            orderNoteRepo = await _orderNotes.GetAll();

            storefrontItemRepo.Clear();
            storefrontItemRepo = await _sfItemsService.GetAll();

            orderedItemRepo.Clear();
            orderedItemRepo = await _orderedItemService.GetAll();

            ResetCacheAge();

        }

        private void ResetCacheAge()
        {
            DateLastUpdated = DateTime.Now;
        }

        public async Task<List<OrderStatus>> GetAllOrderStatusesAsync()
        {
            if (DateTime.Now < DateLastUpdated.AddMinutes(RefreshInterval.TotalMinutes))
            {
                return orderStatusRepo;
            }
            else
            {
                await LoadCache();
                return orderStatusRepo;

            }
        }

        public async Task<List<Customer>> GetAllCustomersAsync()
        {
            if (DateTime.Now < DateLastUpdated.AddMinutes(RefreshInterval.TotalMinutes))
            {
                return customerRepo;
            }
            else
            {
                await LoadCache();
                return customerRepo;

            }
        }

        public async Task<List<OrderNote>> GetAllOrderNotesAsync()
        {
            if (DateTime.Now < DateLastUpdated.AddMinutes(RefreshInterval.TotalMinutes))
            {
                return orderNoteRepo;
            }
            else
            {
                await LoadCache();
                return orderNoteRepo;

            }
        }

        public async Task<List<OrderedItem>> GetAllOrderedItemsAsync()
        {
            if (DateTime.Now < DateLastUpdated.AddMinutes(RefreshInterval.TotalMinutes))
            {
                return orderedItemRepo;
            }
            else
            {
                await LoadCache();
                return orderedItemRepo;

            }
        }

        public async Task<List<StorefrontItem>> GetAllStorefrontItemsAsync()
        {
            if (DateTime.Now < DateLastUpdated.AddMinutes(RefreshInterval.TotalMinutes))
            {
                return storefrontItemRepo;
            }
            else
            {
                await LoadCache();
                return storefrontItemRepo;

            }
        }



    }
}
