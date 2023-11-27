using EverGlow.DataAccess.DbModels;
using EverGlow.DataAccess.Repos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EverGlow.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IRepository<InventoryItem> _inventoryRepo;

        public InventoryController(IRepository<InventoryItem> inventoryRepo)
        {
            _inventoryRepo = inventoryRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllInventoryItemsAsync()
        {
            var result = await _inventoryRepo.GetAll();

            return Ok(result);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetOneByIdAsync(int id)
        {
            var result = await _inventoryRepo.GetAll();
            
            return Ok(result.Where(x => x.Id == id).FirstOrDefault());
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewInventoryItemAsync([FromBody] InventoryItem item)
        {
            var result = await _inventoryRepo.Create(item);

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateInventoryItemAsync([FromBody] InventoryItem item)
        {
            var result = await _inventoryRepo.Update(item);

            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteItemAsync(InventoryItem item)
        {
           await _inventoryRepo.Delete(item);

            return Ok("Deleted");
        }
    }
}
