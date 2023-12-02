using EverGlow.DataAccess.DbModels;
using EverGlow.DataAccess.Models;
using EverGlow.DataAccess.Repos;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.Services
{
    public class OrderFacade : IOrderFacade
    {
        private readonly IRepository<OrderStatus> _orderStatusService;
        private readonly IRepository<Customer> _customerService;
        private readonly IRepository<OrderNote> _orderNotes;
        private readonly IRepository<OrderedItem> _orderedItemService;
        private readonly IRepository<StorefrontItem> _sfItemsService;

        public OrderFacade(IRepository<OrderStatus> orderStatusService, IRepository<Customer> customerService, 
            IRepository<OrderNote> orderNotes, IRepository<OrderedItem> orderedItemService, 
            IRepository<StorefrontItem> sfItemsService)
        {
            _orderNotes = orderNotes;
            _orderStatusService = orderStatusService;
            _customerService = customerService;
            _orderedItemService = orderedItemService;
            _sfItemsService = sfItemsService;
            _sfItemsService = sfItemsService;
        }

        public async Task<Order> GetOrderByOrderStatusIdAsync(int orderStatusId)
        {
            var order = new Order();

            var orderStatuses = await _orderStatusService.GetAll();

            order.orderStatusItem = orderStatuses.FirstOrDefault(x => x.Id == orderStatusId);

            if(order.orderStatusItem == null)
            {
                return order;
            }

            order.customer = await GetCustomerByIdAsync(order.orderStatusItem.CustomerId);
            order.orderNotes = await GetOrderNotesByOrderStatusIdAsync(orderStatusId);
            order.orderedItems = await GetStorefrontItemsByOrderStatusIdAsync(orderStatusId);


            return order;
        }

        public async Task<OrderNote> PostNoteToDatabaseAsync(OrderNote note)
        {
            return await _orderNotes.Create(note);
        }

        private async Task<Customer?> GetCustomerByIdAsync(int customerId)
        {
            var customers = await _customerService.GetAll();
            return customers.FirstOrDefault(x => x.Id == customerId);
        }

        private async Task<List<OrderNote>> GetOrderNotesByOrderStatusIdAsync(int orderStatusId)
        {
            var notes = await _orderNotes.GetAll();

            var orderNotes = new List<OrderNote>();
            foreach (OrderNote note in notes.Where(x => x.OrderStatusId == orderStatusId))
            {
                orderNotes.Add(note);
            }
            return orderNotes;
        }

        private async Task<List<CustomizedItem>> GetStorefrontItemsByOrderStatusIdAsync(int orderStatusId)
        {
            var orderedItems = await _orderedItemService.GetAll();
            var storefrontItems = await _sfItemsService.GetAll();

            var orderedItemsByStatusId = orderedItems.Where(x => x.OrderStatusId == orderStatusId).ToList();

            var storeFrontList = new List<CustomizedItem>();
            foreach(OrderedItem item in orderedItemsByStatusId)
            {
                var sfItem = storefrontItems.FirstOrDefault(x => x.Id == item.StorefrontItemId);
                var customItem = new CustomizedItem()
                {
                    Id = item.Id,
                    OrderStatusId = item.OrderStatusId,
                    StorefrontItem = sfItem,
                    CandleType = item.CandleType,
                    CandleSize = item.CandleSize,
                    ContainerColor = item.ContainerColor,
                    ItemPrice = item.ItemPrice
                };
                storeFrontList.Add(customItem);
            }

            return storeFrontList;
        }
    }
}
