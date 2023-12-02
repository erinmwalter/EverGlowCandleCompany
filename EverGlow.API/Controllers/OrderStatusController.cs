using EverGlow.DataAccess.DbModels;
using EverGlow.DataAccess.Models;
using EverGlow.DataAccess.Repos;
using EverGlow.DataAccess.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EverGlow.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderStatusController : ControllerBase
    {
        private readonly IRepository<OrderStatus> _osRepo;
        private readonly IOrderFacade _orderService;

        public OrderStatusController(IRepository<OrderStatus> osRepo, IOrderFacade orderService)
        {
            _osRepo = osRepo;
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrderStatusesAsync()
        {
            var result = await _osRepo.GetAll();

            return Ok(result.OrderByDescending(x => x.OrderDate));
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetOneByIdAsync(int id)
        {
            var result = await _osRepo.GetAll();

            return Ok(result.Where(x => x.Id == id).FirstOrDefault());
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewOrderStatusItemAsync([FromBody] OrderStatus item)
        {
            var result = await _osRepo.Create(item);

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateOrderStatusItemAsync([FromBody] OrderStatus item)
        {
            var result = await _osRepo.Update(item);

            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteItemAsync(OrderStatus item)
        {
            await _osRepo.Delete(item);

            return Ok("Deleted");
        }

        [HttpGet]
        [Route("order/{id}")]
        public async Task<IActionResult> GetOrderbyOrderStatusId(int id)
        {
            var result = await _orderService.GetOrderByOrderStatusIdAsync(id);

            return Ok(result);
        }

        [HttpPost]
        [Route("note")]
        public async Task<IActionResult> CreateOrderNoteAsync([FromBody] OrderNote item)
        {
            var result = await _orderService.PostNoteToDatabaseAsync(item);

            return Ok(result);
        }
    }
}
